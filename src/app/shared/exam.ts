import  {Question} from './question'

export class Exam {
    id: number
    theme: string
    nom: string
    score: number
    temps: number
    questions: Question[]
}

export const Themes = ['Base des données','Algorithmique','Programmation']

