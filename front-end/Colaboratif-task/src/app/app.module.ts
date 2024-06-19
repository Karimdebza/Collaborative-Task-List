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
