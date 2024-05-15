import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Colaboratif-task';

  showNavigation = true;

  constructor(private router:Router){
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.showNavigation= !['/signin', '/signup'].includes(event.url);
      }
    })
  }

}
