import { Component, OnInit } from '@angular/core';
import { SocketServiceTsService } from 'src/app/services/socket.service.ts.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any = [];

  constructor(private notificationservice:SocketServiceTsService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    console.log('NotificationComponent initialized');
    this.notificationservice.onNotification((notification: any) => {
      console.log('Notification received in component:', notification);
      this.notifications.push(notification);
      console.log('Updated notifications array:', this.notifications);
      this.cdr.detectChanges();
    });
  }

  sendTestNotification() {
    const testNotification = {
      message: 'This is a test notification',
      date: new Date()
    };
    this.notificationservice.sendNotification(testNotification);
  }

}
