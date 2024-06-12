import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceTsService {

  constructor() { }

  requestPermission(){
    if ('Notification' in window) {
    Notification.requestPermission().then((result) => {
      if( result === 'granted'){
        console.log("Notification permission garanted");
        
      }else{
        console.log("Notificationpermission denied.");
        
      }
    });
  }
  }

  showNotification(title:string, option?:NotificationOptions){
    if ('Notification' in window) {
    if(Notification.permission === 'granted'){
      new Notification(title,option);
    }
  }
}


}
