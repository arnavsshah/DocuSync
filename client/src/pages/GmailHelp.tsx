
import { AppBar } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

export const GmailHelp = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (<>
        <AppBar></AppBar>
        <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Help Center"></Tab>
            <Tab label="Community"></Tab>
        </Tabs>
        
    </>);
}