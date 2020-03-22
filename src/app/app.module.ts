import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {HomeComponent} from './home/home.component'
import {ExamInterfaceComponent} from './exam-interface/exam-interface.component'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';


import {MatListModule} from '@angular/material/list';

import {AppRoutingModule} from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ExamInterfaceComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
