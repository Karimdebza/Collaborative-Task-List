import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  step = 1;

  constructor(private router:Router){}
  nextStep() {
    this.step += 1;
  }

  finishOnboarding() {
    this.router.navigate(['/home']);
  }
}
