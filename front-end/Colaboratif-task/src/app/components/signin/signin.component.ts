import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterfaceTs } from 'src/app/interface/user.interface.ts';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
authForm!:FormGroup;

constructor(private userService:UserServiceTsService, private formBuilder:FormBuilder, private route:Router){}

ngOnInit(): void {
  this.authForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  });
  this.authenticateUser();
}

authenticateUser(): void {
  if(this.authForm.valid){
  const userData = this.authForm.value;
  this.userService.signinUser(userData).subscribe(
    {next : data => {
      console.log('authentification reussie :', data);
      
      this.route.navigate(['/home']);
      
    },
    error : error => {
      console.error("authentification echoué :",error);
    }}
  )
  }
}
}