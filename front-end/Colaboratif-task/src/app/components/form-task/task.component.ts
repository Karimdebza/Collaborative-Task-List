import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { DatePipe } from '@angular/common';
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
constructor(private Form:FormBuilder, private ServiceTask:TaskServiceTsService, private router:Router, private route: ActivatedRoute, private datePipe: DatePipe){}

ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); 
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
      const formattedDateCreate = this.datePipe.transform(task.date_of_create, 'yyyy-MM-dd');
      const formattedDateExpiry = this.datePipe.transform(task.date_of_expiry, 'yyyy-MM-dd');
      this.taskForm.patchValue({
        name:task.name,
        description:task.description,
        date_of_create:formattedDateCreate,
        date_of_expiry:formattedDateExpiry,
        id_task_list: task.id_task_list

      });
    });
  }
}

formTask(): void {
  // Vérifiez si l'userId est de type 'number'
  if (typeof this.userId !== 'number') {
    console.error("userId doit être un nombre.");
    return;
  }

  // Vérifiez si le formulaire est valide
  if (!this.taskForm.valid) {
    console.error("Le formulaire de tâche n'est pas valide.");
    return;
  }

  // Si taskId n'est pas null, mettez à jour la tâche existante
  if (this.taskId !== null) {
    this.ServiceTask.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: data => {
        console.log("Tâche mise à jour avec succès", data);
        this.router.navigate(['/task-list']);
      },
      error: error => {
        console.error("Erreur lors de la mise à jour de la tâche :", error);
      }
    });
  } else {
    // Créez une nouvelle tâche
    this.ServiceTask.createTask(this.taskForm.value, this.userId).subscribe({
      next: () => {
        console.log('Tâche créée avec succès');
        this.router.navigate(['/task-list']);
      },
      error: error => {
        console.error("Erreur lors de la création de la tâche :", error);
      }
    });
  }
}


}