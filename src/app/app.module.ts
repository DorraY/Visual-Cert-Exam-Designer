import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {HomeComponent} from './home/home.component'
import {ExamInterfaceComponent} from './exam-interface/exam-interface.component'
import { QuestionsInterfaceComponent } from './questions-interface/questions-interface.component';
import { AboutComponent } from './about/about.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';


import {MatListModule} from '@angular/material/list';

import {AppRoutingModule} from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component'

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';

import {MatButtonModule} from '@angular/material/button';
import { AideComponent } from './aide/aide.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ExamInterfaceComponent,
    HomeComponent,
    HeaderComponent,
    QuestionsInterfaceComponent,
    AboutComponent,
    AideComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    AppRoutingModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    


  ],
  entryComponents: [
    AboutComponent,AideComponent
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
