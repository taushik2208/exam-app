import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { QuestionsComponent } from './questions/questions.component';
import { AllUserDetailsComponent } from './all-user-details/all-user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    QuestionsComponent,
    AllUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
