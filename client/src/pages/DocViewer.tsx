import { Title } from '@mantine/core';
import { GmailHelpAppBar } from '../components/GmailHelpAppBar';

export const DocViewer = () => {
    return (<>
        <GmailHelpAppBar tabValue={0}/>
        <img style={{width: '100%'}} src="stolen_help_center_header.png"></img>
        <Title>Documentation</Title>
    </>);
}