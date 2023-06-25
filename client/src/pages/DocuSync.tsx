import { Flex, Tabs, Title } from '@mantine/core';
import { SuggestionReviewer } from '../components/SuggestionReviewer';
import { useEffect, useState } from 'react';
import { Suggestion } from '../util/types';
import axios from 'axios';

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

const fetchSuggestions = async () => {
    const data = await axios.get('http://localhost:5000/suggestions/');
    //const data = await axios.get('http://127.0.0.1:5000/suggestions');
    //const data = await fetch('http://127.0.0.1:5000/suggestions');
    console.log(data);
    return data;
}

export const DocuSync = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    useEffect(() => {
        fetchSuggestions().then((data) => console.log(data));
        
        setSuggestions([
            {oldDocText: oldCode, newDocText: newCode}
        ])
    }, [setSuggestions]);
    return (<>
        <Title>DocuSync</Title>
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
            {/* for now, to prevent errors */}
            {suggestions.length && <SuggestionReviewer suggestion={suggestions[0]}/>}
        </Flex>
        {/* </Group> */}
    </>);
}