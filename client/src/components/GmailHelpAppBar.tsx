import { AppBar, Toolbar, Typography, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export const GmailHelpAppBar = (props: {tabValue: number}) => {
    const [tabValue, setTabValue] = useState(props.tabValue);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (<>
        <AppBar position="static" color='primary'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Gmail Help
                </Typography>
            </Toolbar>
        </AppBar>
        <Tabs value={tabValue} onChange={handleChange}>
            <Tab href="/docs" label="Help Center"></Tab>
            <Tab href="/community" label="Community"></Tab>
        </Tabs>
    </>);
}