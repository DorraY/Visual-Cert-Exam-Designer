export class Question {
    enonce: string
    questionId: number
    reponses: {
        enonce: string,
        correct: boolean,
        reponseId: number
    }[]
    explication: string
    chapitre: string
}