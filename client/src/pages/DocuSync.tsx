import { AppShell, Flex, Header, LoadingOverlay, Paper, Tabs, Title, Text, Burger, Group, Skeleton, Space, Avatar } from '@mantine/core';
import { SuggestionReviewer } from '../components/SuggestionReviewer';
import { useEffect, useState } from 'react';
import { Suggestion } from '../util/types';
import axios from 'axios';
import Banner from '../components/Banner';

const fetchSuggestions = async (): Promise<Suggestion[]> => {
    const resp = await axios.get('http://localhost:5000/suggestions/');
    const suggestions = resp.data.suggestions;

    // Remap suggestions
    const convertedSuggestions: Suggestion[] = suggestions.map(
        (suggestion: any) => ({
            oldDocText: suggestion.old_doc,
            newDocText: suggestion.new_doc,
            question: suggestion.question,
            answer: suggestion.answer,
            suggestion_id: suggestion.suggestion_id,
            doc_id: suggestion.doc_id
        })
    );
    return convertedSuggestions;
}

// const acceptChange = async (suggestion: Suggestion) => {
//     console.log('accepting change: ', suggestion);
//     await axios.post('http://localhost:5000/suggestions/', {
//         suggestion_id: suggestion.suggestion_id,
//         doc_id: suggestion.doc_id,
//         new_doc: suggestion.newDocText
//     },
//     {
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     });
//     //refreshSuggestions();
// }

// // TODO reject change
// const rejectChange = async (suggestion: Suggestion) => {
//     console.log('rejecting change: ', suggestion);
//     await axios.post('http://localhost:5000/suggestions/delete/', {
//         suggestion_id: suggestion.suggestion_id
//     },
//     {
//         headers: {
//             "Content-Type": 'application/json'
//         }
//     });
//     //refreshSuggestions();
// }

export const DocuSync = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);

    const setActiveTab = (tabValue: string) => {
        // make tab values numeric so we can turn it into an index
        setActiveSuggestionIdx(parseInt(tabValue));
    }

    const refreshSuggestions = () => {
        setIsLoaded(false);
        fetchSuggestions().then((suggestions) => {
            setSuggestions(suggestions);
            setIsLoaded(true);
        });
    }

    const acceptChange = async (suggestion: Suggestion) => {
        console.log('accepting change: ', suggestion);
        await axios.post('http://localhost:5000/suggestions/', {
            suggestion_id: suggestion.suggestion_id,
            doc_id: suggestion.doc_id,
            new_doc: suggestion.newDocText
        },
        {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        refreshSuggestions();
    }
    
    const rejectChange = async (suggestion: Suggestion) => {
        console.log('rejecting change: ', suggestion);
        await axios.post('http://localhost:5000/suggestions/delete/', {
            suggestion_id: suggestion.suggestion_id
        },
        {
            headers: {
                "Content-Type": 'application/json'
            }
        });
        refreshSuggestions();
    }

    useEffect(() => {
        refreshSuggestions();
    }, [setSuggestions]);
    return (<>
        <AppShell padding="md"
            header={
            <Header height={60}>
                <Paper py="sm" px="sm" shadow='xs'>
                    <Flex style={{alignItems: 'center'}}>
                        <Burger opened={false} style={{marginRight: '8px'}}/>
                        <Title inline>Docu</Title><Title inline color="blue">Sync</Title>
                        <Space style={{flexGrow: 1}}></Space>
                        <Paper shadow="xs" py="4px" px="8px" radius="md">
                            <Group>
                            <Avatar color='blue'></Avatar>
                            <Title order={5}>Welcome, Anders!</Title>
                            </Group>
                        </Paper>
                    </Flex>
                </Paper>
            </Header>
            }
        >   
            <Banner numOpportunities={isLoaded ? suggestions.length.toString() : '...'}/>
            <Flex>
                <Tabs variant="outline" orientation="vertical" defaultValue='0' onTabChange={setActiveTab}
                    style={{
                        //backgroundColor: '#000000'
                    }}
                >
                    <Tabs.List>
                        {suggestions.map((suggestion, idx) => (
                            <Tabs.Tab value={`${idx}`}>
                                {idx === activeSuggestionIdx ?
                                <Text color='blue' fw={700}>Suggestion {idx+1}</Text>
                                :
                                <Text>Suggestion {idx+1}</Text>
                                }
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>

                {isLoaded ? 
                    suggestions.length ? 
                        <SuggestionReviewer suggestion={suggestions[activeSuggestionIdx]} onApprove={acceptChange} onReject={rejectChange}/>
                    : <Title order={3}>No more suggestions!</Title>
                : <LoadingOverlay visible={true}/>}
            </Flex>
        </AppShell>
    </>);
}