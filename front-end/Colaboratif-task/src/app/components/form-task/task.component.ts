import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
// import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
taskForm!:FormGroup;
taskId: number | null = null;
userId: number | null = null;
constructor(private Form:FormBuilder, private ServiceTask:TaskServiceTsService, private router:Router, private route: ActivatedRoute){}

ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
  this.taskForm = this.Form.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
    date_of_expiry: [new Date(), Validators.required],
    id_task_list: [ , Validators.required]
  });
  this.taskId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
  if (this.taskId) {
    this.ServiceTask.getTaskById(this.taskId).subscribe(task => {
      this.taskForm.patchValue(task);
    });
  }
}

formTask():void {
  if (typeof this.userId === 'number') {
    if (this.taskId !== null) {
  if(this.taskForm.valid){
    if(this.userId){
    this.ServiceTask.updateTask(this.taskId,this.taskForm.value).subscribe({
      next :data => {
        console.log("create new task",data);

        this.router.navigate(['/task-list']);
    },
      error : error => {
        console.error("error:",error)
      }
    });
  
  }else{
    this.ServiceTask.createTask(this.taskForm.value,this.userId).subscribe(() => {
      console.log('Tâche créée avec succès');
      this.router.navigate(['/task-list']);
    });
  }
  }
}else{
  "user id is null"
}
}


}


}