import { Button, Group, Paper, Space } from "@mantine/core";
import { DocDiffViewer } from "./DocDiffViewer";
import { Suggestion } from "../util/types";

export const SuggestionReviewer = (props: {suggestion: Suggestion}) => {
    const { suggestion } = props;
    return (<>
        <Paper shadow="md" p="md" style={{flexGrow: 1}}>
            <DocDiffViewer oldText={suggestion.oldDocText} newText={suggestion.newDocText}></DocDiffViewer>
            <Space h="xl"/>
            <Group>
                <Button color='green'>Approve Change</Button>
                <Button color='red'>Reject Change</Button>
            </Group>
        </Paper>
        
    </>);
}