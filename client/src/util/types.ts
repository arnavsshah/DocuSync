export interface Suggestion {
    oldDocText: string,
    newDocText: string,
    question: string,
    answer: string,
    suggestion_id: string,
    doc_id: string
}

export interface QA {
    question: string,
    answer?: string,
    suggestion_id: string,
}
