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

constructor(private Form:FormBuilder, private ServiceTask:TaskListServiceTsService){}


ngOnInit(): void {
  this.listForm = this.Form.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
    date_of_expiry: [new Date(), Validators.required],
    id_task_list: [ , Validators.required]
  })
}


createTask():void {
  if(this.listForm.valid){
    this.ServiceTask.createTaskList(this.listForm.value,2).subscribe({
      next :data => {
        console.log("create new task");
        
      },
      error : error => {
        console.error("error:",error)
      }
    })
  }
}


}
