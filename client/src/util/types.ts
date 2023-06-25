export interface Suggestion {
    oldDocText: string,
    newDocText: string,
    question: string,
    answer: string
}

export interface QA {
    question: string,
    answer?: string
}