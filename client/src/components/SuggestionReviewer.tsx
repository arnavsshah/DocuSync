import { Anchor, Button, Flex, Group, Paper, Space, Stack, Text, Title } from "@mantine/core";
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
            <Title order={3} style={{marginBottom: '16px'}}>Gmail Help Center</Title>
            <DocDiffViewer oldText={suggestion.oldDocText} newText={suggestion.newDocText}></DocDiffViewer>
            <Space h="xl"/>
            <Flex align="flex-end" gap="md">
                {/* <Stack style={{flexGrow: 1}}>
                    <Paper>
                        Q: {suggestion.question}
                    </Paper>
                    <Paper h="sm">
                        A: {suggestion.answer}
                    </Paper>
                </Stack> */}
                <div style={{flexGrow: 1, display: 'flex', alignItems: 'center', height: '36px'}}>
                    <Text sx={{textAlign: 'center'}}>Source: <Anchor href={`/community#${suggestion.suggestion_id}`} target="_blank">Gmail Help Community</Anchor></Text>
                </div>
                <Button color='green' onClick={() => {onApprove(suggestion)}}>Approve</Button>
                <Button color='red' onClick={() => {onReject(suggestion)}}>Reject</Button>
            </Flex>
        </Paper>
    </>);
}