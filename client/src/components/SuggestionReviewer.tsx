import { Button, Group, Paper, Space } from "@mantine/core";
import { DocDiffViewer } from "./DocDiffViewer";

const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;
const newCode = `
const a = 10
const boo = 10

if(a === 10) {
/Users/anderslie/Sync/Code/hackathons/gen_ai/DocuSync/client/src/components  console.log('bar')
}
`;

export const SuggestionReviewer = () => {
    return (<>
        <Paper shadow="md" p="md" style={{flexGrow: 1}}>
            <DocDiffViewer oldText={oldCode} newText={newCode}></DocDiffViewer>
            <Space h="xl"/>
            <Group>
                <Button color='green'>Approve Change</Button>
                <Button color='red'>Reject Change</Button>
            </Group>
        </Paper>
        
    </>);
}