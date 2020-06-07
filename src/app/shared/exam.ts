import  {Question} from './question'
import { Theme } from './theme'

export class Exam {
    exId: number
    exThCode: Theme
    exNom: string
    exScore: number
    exTime: number
}

export const Themes = ['Base des données','Algorithmique','Programmation']

