//import { Paper } from "@mantine/core";
import { Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { QA } from "../util/types";
import axios from "axios";

export const QuestionAnswer = (props: {
    qa: QA
    // question: string,
    // answer?: string
}) => {
    const { qa: {answer: initialAnswer, question, suggestion_id} } = props;
    //const isAnswered = initialAnswer !== null;
    const [isAnswered, setIsAnswered] = useState(initialAnswer !== null);
    const [answer, setAnswer] = useState(initialAnswer ?? '');
    //const { question } = props;

    const onAnswerChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const onSubmit = async () => {
        console.log('submitting answer: ', answer);

        // Don't await - we will be waiting too long for GPT to do stuff
        axios.post('http://localhost:5000/forum/answers/', {
            suggestion_id: suggestion_id,
            answer: answer
        },
        {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        setIsAnswered(true);
    }

    return (<>
        <Paper id={suggestion_id} elevation={2} sx={{
            maxWidth: '800px',//width:'50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '16px',
            padding:'8px'}}>
            <Typography variant='h5'>Question</Typography>
            <Typography paragraph>{question}</Typography>
            <Typography variant='h5'>Answer</Typography>
            {isAnswered ?
            <Typography paragraph>{answer}</Typography>
            :
            <>
                <TextField value={answer} onChange={onAnswerChanged} multiline sx={{width:'100%', marginBottom: '8px'}}/>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={onSubmit} variant="outlined">Submit</Button>
                </div>
            </>
            }
        </Paper>
    </>);
}