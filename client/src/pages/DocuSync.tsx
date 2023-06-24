import { Flex, Group, Paper, Tabs, Title } from '@mantine/core';
import ReactDiffViewer from 'react-diff-viewer';
import { DocDiffViewer } from '../components/DocDiffViewer';
import { SuggestionReviewer } from '../components/SuggestionReviewer';

export const DocuSync = () => {
    return (<>
        <Title>DocuSync</Title>
        {/* <Group grow> */}
        <Flex>
            <Tabs orientation="vertical">
                <Tabs.List>
                    <Tabs.Tab value="suggestion0">Suggestion 0</Tabs.Tab>
                    <Tabs.Tab value="suggestion1">Suggestion 1</Tabs.Tab>
                </Tabs.List>
            </Tabs>
            {/* <Paper shadow="md" p="md" style={{flexGrow: 1}}>
                <ReactDiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />
            </Paper> */}
            <SuggestionReviewer/>
        </Flex>
        {/* </Group> */}
    </>);
}