import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListDetailComponent } from './components/task-list/task-list-detail/task-list-detail.component';
import { TaskComponent } from './components/form-task/task.component';
import {ComponentssignupComponent}from './components/signup/componentssignup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FormListComponent } from './components/task-list/form-list/form-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { authGuard } from './guard/auth.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { SubTaskFormComponent } from './components/sub-task-form/sub-task-form.component';

const routes: Routes = [
  {path: "", redirectTo:"/signin", pathMatch:"full"},
  {path:"signup", component:ComponentssignupComponent},
  {path:"signin", component: SigninComponent},
  {path:"home", component: HomeComponent, canActivate:[authGuard]},
  {path:"task-list", component:TaskListComponent, canActivate:[authGuard]},
  { path: 'task-list/:id', component: TaskListDetailComponent, canActivate:[authGuard]},
  { path: 'task', component: TaskComponent, canActivate:[authGuard]},
  { path: 'profil', component: ProfilComponent, canActivate:[authGuard] },
  { path: 'form-list', component: FormListComponent, canActivate:[authGuard]},
  { path: 'task/edit/:id', component: TaskComponent, canActivate:[authGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate:[authGuard] },
  { path: 'task/:id/edit', component: SubTaskFormComponent, canActivate:[authGuard] },
  { path: 'form-list/edit/:id', component: FormListComponent }, 
  {path:'notification', component:NotificationComponent, canActivate:[authGuard]},
  {path:'calendar', component:CalendarComponent, canActivate:[authGuard]},
  { path: '', redirectTo: '/task', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
