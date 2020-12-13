import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AllUserDetailsComponent } from './all-user-details/all-user-details.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'user', component: UserComponent},
  {path: 'alluser', component: AllUserDetailsComponent},
  {path: 'test/:email', component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
