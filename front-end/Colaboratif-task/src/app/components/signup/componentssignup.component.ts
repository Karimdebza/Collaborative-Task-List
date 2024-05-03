import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
import { UserInterfaceTs } from 'src/app/interface/user.interface.ts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-componentssignup',
  templateUrl: './componentssignup.component.html',
  styleUrls: ['./componentssignup.component.css']
})
export class ComponentssignupComponent implements OnInit {

registrationForm!:FormGroup;

 constructor(private formBuilder:FormBuilder, private serviceUser:UserServiceTsService, private route: Router){

 }

 ngOnInit(): void {
   this.registrationForm = this.formBuilder.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
   });
 }



createUser(): void {
  if(this.registrationForm.valid){
    const userData = this.registrationForm.value;
    this.serviceUser.createUser(userData).subscribe({
      next : data => {
        console.log('Iscription reussie :', data);
        // tomporerment la route task-list quand je cree la page home je fais l'update 
        this.route.navigate(['/task-list']);
        
      },
      error : error => {
        console.error("insciption echoué :",error);
      }
      
    })
  }
}

}
