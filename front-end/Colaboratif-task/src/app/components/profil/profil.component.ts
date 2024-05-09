import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profilForm!:FormGroup;
  userId!:number;


  constructor(private userSevice:UserServiceTsService, private formBuilder:FormBuilder){}

ngOnInit(): void {
  
this.profilForm = this.formBuilder.group({
  name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
})


}


getUserData() {
  this.userSevice.getUserById(4).subscribe({
    next : data => {
      console.log("recuperation des données reussi", data);
      this.profilForm.patchValue({
        name: data.name,
        email: data.email
      });
    },
    error: error =>  {
      console.error("erreur lors de la recuperation des données ", error)
    }
  })
}


}
