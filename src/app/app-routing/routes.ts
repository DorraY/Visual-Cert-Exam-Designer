import {Routes} from '@angular/router'

import {ExamInterfaceComponent} from '../exam-interface/exam-interface.component'
import {HomeComponent} from '../home/home.component'

export const routes:Routes = [
    {path:'home', component: HomeComponent},
    {path: 'exam-interface', component: ExamInterfaceComponent},
    {path: '' , redirectTo: '/home', pathMatch: 'full'},
    {path: '**',redirectTo: '/home'}
]