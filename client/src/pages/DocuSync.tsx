import { Flex, Tabs, Title } from '@mantine/core';
import { SuggestionReviewer } from '../components/SuggestionReviewer';
import { useEffect, useState } from 'react';
import { Suggestion } from '../util/types';
import axios from 'axios';

const fetchSuggestions = async (): Promise<Suggestion[]> => {
    const resp = await axios.get('http://localhost:5000/suggestions/');
    const suggestions = resp.data.suggestions;

    // Remap suggestions
    const convertedSuggestions: Suggestion[] = suggestions.map(
        (suggestion: any) => ({
            oldDocText: suggestion.old_doc,
            newDocText: suggestion.new_doc
        })
    );
    return convertedSuggestions;
}

export const DocuSync = () => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    useEffect(() => {
        fetchSuggestions().then((suggestions) => {
            setSuggestions(suggestions);
        });
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
            {/* for now, to prevent errors */}
            {suggestions.length && <SuggestionReviewer suggestion={suggestions[0]}/>}
        </Flex>
    </>);
}