import { useState } from 'react';
import { Paper, Text, Button } from '@mantine/core';

const Banner = (props: { text: string }) => {
    //const Banner = (props: { children: string }) => {    
    //const lines = props.children.split('\\n');
    const lines = props.text.split('\\n');

    const [isOpen, setIsOpen] = useState(true);

    if (isOpen) {
        return (
            <Paper py="sm" px="sm" shadow="sm" style={{ marginBottom: '8px' }} bg="blue">
            {lines.map((line, index) => (<>
                <Text key={index} size="md" weight={500} color="white" style={{ display: 'block' }}>
                {line}
                </Text>
                </>))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button onClick={() => {setIsOpen(false);}} variant="light" size="sm">
                Close
                </Button>
            </div>
            </Paper>
        );
    } else {
        return <></>;
    }
};
  
export default Banner;