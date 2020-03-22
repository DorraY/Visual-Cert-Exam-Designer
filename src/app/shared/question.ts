export class Question {
    enonce: string
    reponse: {
        enonce: string,
        correct: boolean
    }[]
    explication: string
}