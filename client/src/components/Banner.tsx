import { useState } from 'react';
import { Paper, Text, Button } from '@mantine/core';

const Banner = (props: {numOpportunities: string}) => {
    const [isOpen, setIsOpen] = useState(true);

    if (isOpen) {
        return (
            <Paper py="sm" px="sm" shadow="sm" style={{ marginBottom: '8px', display:'flex', alignItems: 'center'}} bg="blue">
                <Text size="md" weight={500} color="white" style={{flexGrow: 1}}>
                    Welcome to DocuSync! We’ve identified {props.numOpportunities} opportunities to improve the Gmail Help Center. You can review and edit our suggestions below.
                </Text>
                <Button onClick={() => {setIsOpen(false);}} variant="light" size="sm">
                Dismiss
                </Button>
            </Paper>
        );
    } else {
        return <></>;
    }
};
  
export default Banner;