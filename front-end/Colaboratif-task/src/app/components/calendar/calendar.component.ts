import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'karimkey',
    events: {
      googleCalendarId: '1'
    }
  };
}
