import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    googleCalendarApiKey: 'YOUR_GOOGLE_API_KEY',
    events: {
      googleCalendarId: 'YOUR_GOOGLE_CALENDAR_ID@group.calendar.google.com'
    }
  };
}
