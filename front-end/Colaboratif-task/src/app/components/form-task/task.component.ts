import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
taskForm!:FormGroup;

constructor(private Form:FormBuilder, private ServiceTask:TaskServiceTsService){}

ngOnInit(): void {
  this.taskForm = this.Form.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
    date_of_expiry: [new Date(), Validators.required]
  })
}

createTask():void {
  if(this.taskForm.valid){
    this.ServiceTask.createTask(this.taskForm.value,2).subscribe({
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
