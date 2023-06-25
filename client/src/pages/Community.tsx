import { CircularProgress } from '@mui/material';
import { GmailHelpAppBar } from '../components/GmailHelpAppBar';
import { QuestionAnswer } from '../components/QuestionAnswer';
import { useEffect, useState } from 'react';
import { QA } from '../util/types';
import axios from 'axios';

const fetchPosts = async (): Promise<QA[]> => {
    const resp = await axios.get('http://localhost:5000/forum/');
    const posts = resp.data.data;
    return posts.map((post: any) => ({
        question: post.question,
        answer: post.answer // TODO take ID
    }));
}

export const Community = () => {
    const [posts, setPosts] = useState<QA[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchPosts().then((posts) => {
            setPosts(posts);
            setIsLoaded(true);
        });
    }, [setPosts]);

    return (<>
        <GmailHelpAppBar tabValue={1}/>
        <img style={{width: '100%'}} src="stolen_community_header.png"></img>
        {isLoaded ? 
        <div style={{padding: '16px'}}>
            {posts.map((post) => (
                <QuestionAnswer question={post.question} answer={post.answer}/>
            ))}
        </div>
        :
        <CircularProgress/>
        }
    </>);
}