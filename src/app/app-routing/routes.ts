import {Routes} from '@angular/router'

import {ExamInterfaceComponent} from '../exam-interface/exam-interface.component'
import {HomeComponent} from '../home/home.component'
import {QuestionsInterfaceComponent} from '../questions-interface/questions-interface.component'
import { AboutComponent } from '../about/about.component'
import { FinishedComponent } from '../finished/finished.component'
import { ExistingExamsComponent } from '../existing-exams/existing-exams.component'
import { ExamDetailsComponent } from '../exam-details/exam-details.component'
import { QuestionDetailsComponent } from '../question-details/question-details.component'
import { ExistingQuestionsComponent } from '../existing-questions/existing-questions.component'

export const routes:Routes = [
    {path:'home', component: HomeComponent},
    {path: 'exam-interface', component: ExamInterfaceComponent},
    {path: '' , redirectTo: '/home', pathMatch: 'full'},
    {path: 'questions-interface',component: QuestionsInterfaceComponent},
    {path: 'about', component: AboutComponent},
    {path: 'finished', component:FinishedComponent},
    {path: 'existing-exams', component: ExistingExamsComponent},
    {path: 'exam-details/:id', component: ExamDetailsComponent},
    {path: 'question-details/:id' , component: QuestionDetailsComponent},
    {path: 'existing-questions/:id', component: ExistingQuestionsComponent},
    {path: '**',redirectTo: '/home'}
]