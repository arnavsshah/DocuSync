import { Button, Flex, Group, Paper, Space, Stack } from "@mantine/core";
import { DocDiffViewer } from "./DocDiffViewer";
import { Suggestion } from "../util/types";

export const SuggestionReviewer = (props: {suggestion: Suggestion}) => {
    const { suggestion } = props;
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
                <Button color='green'>Approve Change</Button>
                <Button color='red'>Reject Change</Button>
            </Flex>
        </Paper>
    </>);
}