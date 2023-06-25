import { Button, Flex, Group, Paper, Space, Stack } from "@mantine/core";
import { DocDiffViewer } from "./DocDiffViewer";
import { Suggestion } from "../util/types";

export const SuggestionReviewer = (props: {
    suggestion: Suggestion,
    onApprove: (suggestion: Suggestion) => void,
    onReject: (suggestion: Suggestion) => void
}) => {
    const { suggestion, onApprove, onReject } = props;
    return (<>
        <Paper shadow="md" p="md" style={{flexGrow: 1}}>
            <DocDiffViewer oldText={suggestion.oldDocText} newText={suggestion.newDocText}></DocDiffViewer>
            <Space h="xl"/>
            <Flex align="flex-end" gap="md">
                <Stack style={{flexGrow: 1}}>
                    <Paper>
                        Q: {suggestion.question}
                    </Paper>
                    <Paper h="sm">
                        A: {suggestion.answer}
                    </Paper>
                </Stack>
                <Button color='green' onClick={() => {onApprove(suggestion)}}>Approve Change</Button>
                <Button color='red' onClick={() => {onReject(suggestion)}}>Reject Change</Button>
            </Flex>
        </Paper>
    </>);
}