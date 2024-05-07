import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListDetailComponent } from './components/task-list/task-list-detail/task-list-detail.component';
import { TaskComponent } from './components/form-task/task.component';
import {ComponentssignupComponent}from './components/signup/componentssignup.component';
import { SigninComponent } from './components/signin/signin.component';
const routes: Routes = [
  {path: "", redirectTo:"/signin", pathMatch:"full"},
  {path:"signup", component:ComponentssignupComponent},
  {path:"signin", component: SigninComponent},
  {path:"task-list", component:TaskListComponent},
  { path: 'task-list/:id', component: TaskListDetailComponent},
  { path: 'task', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
