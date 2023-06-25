import { Flex, LoadingOverlay, Tabs, Title } from '@mantine/core';
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
            newDocText: suggestion.new_doc,
            question: suggestion.question,
            answer: suggestion.answer
        })
    );
    return convertedSuggestions;
}

export const DocuSync = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);

    const setActiveTab = (tabValue: string) => {
        // make tab values numeric so we can turn it into an index
        setActiveSuggestionIdx(parseInt(tabValue));
    }

    useEffect(() => {
        fetchSuggestions().then((suggestions) => {
            setSuggestions([
                ...suggestions, 
                ...[{
                    ...suggestions[0],
                    newDocText: 'terrible suggestion'
                }],
                ...suggestions]);
            setIsLoaded(true);
        });
    }, [setSuggestions]);
    return (<>
        <Title>DocuSync</Title>
        <Flex>
            <Tabs orientation="vertical" defaultValue='0' onTabChange={setActiveTab}>
                <Tabs.List>
                    {suggestions.map((suggestion, idx) => (
                        <Tabs.Tab value={`${idx}`}>Suggestion {idx} ({suggestion.question})</Tabs.Tab>
                    ))}
                </Tabs.List>
            </Tabs>

            {isLoaded ? 
                suggestions.length ? 
                    <SuggestionReviewer suggestion={suggestions[activeSuggestionIdx]}/>
                : <Title>No more suggestions!</Title>
            : <LoadingOverlay visible={true}/>}
        </Flex>
    </>);
}