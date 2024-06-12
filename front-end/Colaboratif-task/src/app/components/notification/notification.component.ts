import { Component, OnInit } from '@angular/core';
import { SocketServiceTsService } from 'src/app/services/socket.service.ts.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notification: any = [];

  constructor(private notificationservice:SocketServiceTsService){}

  ngOnInit(): void {
   this.notificationservice.onNotification((notification: any) => {
    console.log('Notification received:', notification);
    this.notification.push(notification);
   })
    
  }

  sendTestNotification() {
    const testNotification = {
      message: 'This is a test notification',
      date: new Date()
    };
    this.notificationservice.sendNotification(testNotification);
  }

}
