export class Question {
    enonce: string
    reponses: {
        enonce: string,
        correct: boolean
    }[]
    explication: string
    chapitre: string
}