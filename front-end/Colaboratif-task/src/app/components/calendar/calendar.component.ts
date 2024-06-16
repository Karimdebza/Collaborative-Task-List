import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarOptions } from '@fullcalendar/core';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  userId:number | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'karimkey',
    events: []
  };

  constructor(private taskService:TaskServiceTsService){}


  ngOnInit(): void {
    const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); 
  this.userId = userIdString ? Number(userIdString) : null;
  this.loadTasks();
  }

  loadTasks(): void{
    if (typeof this.userId === 'number') {
    this.taskService.getAllTasks(this.userId).subscribe(tasks => {
      const events = tasks.map(task => ({
        title: task.name, 
        start: task.date_of_create, 
        end: task.date_of_expiry 
      }));
      this.calendarOptions.events = events;
      
    })
  }
}
}
