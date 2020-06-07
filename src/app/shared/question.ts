import { Chapter } from "./chapter"
import { Exam } from "./exam"
import { Explication } from "./explication"

export class Question {
    // enonce: string
    // questionId: number
    // reponses: {
    //     enonce: string,
    //     correct: boolean,
    //     reponseId: number
    // }[]
    // explication: string
    // chapitre: string
    quCode: number
    quOrdre: number
    quChCode: Chapter
    exCode: Exam
    quText: string
    Explication:Explication
}