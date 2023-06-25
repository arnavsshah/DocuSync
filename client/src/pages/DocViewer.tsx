import { Title } from '@mantine/core';
import { GmailHelpAppBar } from '../components/GmailHelpAppBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CircularProgress, Paper } from '@mui/material';

const fetchDocs = async (): Promise<string[]> => {
    const resp = await axios.get('http://localhost:5000/');
    const docs = resp.data.data;
    return docs;
};

export const DocViewer = () => {
    const [docs, setDocs] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        fetchDocs().then((docs) => {
            setDocs(docs);
            setIsLoaded(true);
        });
    }, [setDocs]);
    
    return (<>
        <GmailHelpAppBar tabValue={0}/>
        <img style={{width: '100%'}} src="stolen_help_center_header.png"></img>
        
        {isLoaded ?
        <Paper sx={{padding: '8px', paddingLeft: '16px', paddingRight: '16px'}}>
            {docs.map((doc) => (
                <ReactMarkdown>{doc}</ReactMarkdown>
            ))}
        </Paper>
        :
        <CircularProgress/>
        }
    </>);
}