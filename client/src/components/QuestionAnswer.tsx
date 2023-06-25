//import { Paper } from "@mantine/core";
import { Typography, Paper } from "@mui/material";

export const QuestionAnswer = (props: {
    question?: string,
    answer?: string
}) => {
    const { question, answer } = props;
    return (<>
        <Paper elevation={2} sx={{
            maxWidth: '800px',//width:'50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '16px',
            padding:'8px'}}>
            <Typography variant='h5'>Question</Typography>
            <Typography paragraph>{question}</Typography>
            <Typography variant='h5'>Answer</Typography>
            <Typography paragraph>{answer}</Typography>
        </Paper>
    </>);
}