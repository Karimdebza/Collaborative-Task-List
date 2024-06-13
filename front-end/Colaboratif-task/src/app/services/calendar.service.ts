import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public createEvent(event: any): Promise<any> {
    return gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
  }
 
}
