import {Routes} from '@angular/router'

import {ExamInterfaceComponent} from '../exam-interface/exam-interface.component'
import {HomeComponent} from '../home/home.component'
import {QuestionsInterfaceComponent} from '../questions-interface/questions-interface.component'
import { AboutComponent } from '../about/about.component'
import { FinishedComponent } from '../finished/finished.component'
import { ExistingExamsComponent } from '../existing-exams/existing-exams.component'

export const routes:Routes = [
    {path:'home', component: HomeComponent},
    {path: 'exam-interface', component: ExamInterfaceComponent},
    {path: '' , redirectTo: '/home', pathMatch: 'full'},
    {path: 'questions-interface',component: QuestionsInterfaceComponent},
    {path: 'about', component: AboutComponent},
    {path: 'finished', component:FinishedComponent},
    {path: 'existing-exams', component: ExistingExamsComponent},
    {path: '**',redirectTo: '/home'}
]