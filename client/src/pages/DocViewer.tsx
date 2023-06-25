import { Title } from '@mantine/core';
import { GmailHelpAppBar } from '../components/GmailHelpAppBar';

export const DocViewer = () => {
    return (<>
        <GmailHelpAppBar tabValue={0}/>
        <Title>Documentation</Title>
    </>);
}