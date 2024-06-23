import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarOptions } from '@fullcalendar/core';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 userId: number | null = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'karimkey',
    events: [],
  };

  constructor(private taskService: TaskListServiceTsService) {}

  ngOnInit(): void {
    this.userId = this.getUserIdFromLocalStorage();
    this.loadTasks();
  }

  getUserIdFromLocalStorage(): number | null {
    const userIdString = localStorage.getItem('id_user');
    return userIdString ? Number(userIdString) : null;
  }

  loadTasks(): void {
    if (this.userId !== null) {
      this.taskService.getAllTaskLists(this.userId).subscribe(tasks => {
        const events = tasks.map(task => ({
          title: task.title,
          start: task.date_of_create,
          
        }));
        this.updateCalendarEvents(events);
      });
    }
  }

  updateCalendarEvents(events: any[]): void {
    this.calendarOptions.events = events;
  }
}
