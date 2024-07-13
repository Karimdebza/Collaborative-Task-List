import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/form-task/task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentssignupComponent } from './components/signup/componentssignup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
import { FormListComponent } from './components/task-list/form-list/form-list.component';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { FormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { SubTaskFormComponent } from './components/sub-task-form/sub-task-form.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { KanbanComponent } from './kanban/kanban.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskComponent,
    ComponentssignupComponent,
    SigninComponent,
    HomeComponent,
    ProfilComponent,
    FormListComponent,
    NotificationComponent,
    CalendarComponent,
    TaskDetailComponent,
    SubTaskFormComponent,
    OnboardingComponent,
    KanbanComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FullCalendarModule,// Add FullCalendarModule to imports
    FormsModule 
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
