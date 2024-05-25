import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceTsService } from 'src/app/services/user.service.ts.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  profilForm!:FormGroup;
  userId:number |null = null ;


  constructor(public userSevice:UserServiceTsService, private formBuilder:FormBuilder, private route : Router){}

ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
this.profilForm = this.formBuilder.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.required]],
})

this.getUserData();
}


getUserData() {
  if (typeof this.userId === 'number') { //
  this.userSevice.getUserById(this.userId).subscribe({
    next : data => {
      console.log("recuperation des données reussi", data);
      this.profilForm.patchValue({
        name: data.name,
        email: data.email,
        password: data.password
      });
    },
    error: error =>  {
      console.error("erreur lors de la recuperation des données ", error)
    }
  })
}else {
  console.error("L'ID de l'utilisateur est null.");
}

}

updateUserData() {
 
  if (this.profilForm.valid) {
    const formData = this.profilForm.value;

    if (typeof this.userId === 'number') { // Vérifier si userId est un nombre
      this.userSevice.updateUser(this.userId, formData).subscribe({
        next: data => {
          console.log("Mise à jour des données réussie :", data);
          this.getUserData();
        },
        error: error => {
          console.error("Erreur lors de la mise à jour des données :", error);
        }
      });
    } else {
      console.error("L'ID de l'utilisateur est null.");
    }
  }
}


logout(): void {
this.userSevice.logout().subscribe({
  next : () => {
    console.log("deconextion reussie");
  },
  error: () => {
    console.error("error de la deconexion ");
  }
})
}

}