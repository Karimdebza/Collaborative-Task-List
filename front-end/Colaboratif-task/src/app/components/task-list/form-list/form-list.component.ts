import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {
listForm!:FormGroup;
userId:number | null = null;

constructor(private Form:FormBuilder, private ServiceTask:TaskListServiceTsService){}


ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
  this.listForm = this.Form.group({
    title: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
  })
}


createListTask():void {
  if (typeof this.userId === 'number') {
  if(this.listForm.valid){
    this.ServiceTask.createTaskList(this.listForm.value,this.userId).subscribe({
      next :data => {
        console.log("create new task");
        
      },
      error : error => {
        console.error("error:",error)
      }
    
    })
  }
}else{
  console.error("L'ID de l'utilisateur est null.");
}
}


}
