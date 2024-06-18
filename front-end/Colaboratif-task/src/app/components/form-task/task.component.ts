import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SocketServiceTsService } from '../../services/socket.service.ts.service'; 
import { NotificationServiceTsService } from '../../services/notification.service.ts.service'; 


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
taskForm!:FormGroup;
taskId: number | null = null;
userId: number | null = null;
taskListId: number | null = null;

constructor(
  private Form:FormBuilder, 
  private ServiceTask:TaskServiceTsService,
  private router:Router, private route: ActivatedRoute,
  private datePipe: DatePipe,
  private socketService:SocketServiceTsService,
  private notificationService:NotificationServiceTsService,

){}

ngOnInit(): void {
    // Récupérer l'utilisateur et l'ID de la liste des tâches
    this.userId = this.getUserIdFromLocalStorage();
    this.taskListId = this.getTaskListIdFromRoute();
   
    // Initialiser le formulaire de tâche
    this.initializeTaskForm();

    // Si taskId est présent dans la route, charger les détails de la tâche
    this.taskId = this.getTaskIdFromRoute();
    if (this.taskId) {
      this.loadTaskDetails(this.taskId);
      
    }
    this.notificationService.requestPermission();
    this.socketService.onNotification((notification) => {
      console.log('Notification received:', notification);
      this.notificationService.showNotification('Nouvelle notification!',{
        body:notification.message
      });
    });

    
}



initializeTaskForm(): void {
  this.taskForm = this.Form.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
    date_of_expiry: [new Date(), Validators.required],
    timeSpent: [0, Validators.required],
    startTime: [null],
    isTracking: [false],
    id_task_list: [this.taskListId, Validators.required]
  });
}
getUserIdFromLocalStorage(): number | null {
  const userIdString = localStorage.getItem('id_user');
  return userIdString ? Number(userIdString) : null;
}

getTaskIdFromRoute(): number | null {
  const taskIdString = this.route.snapshot.paramMap.get('id');
  return taskIdString ? Number(taskIdString) : null;
}
getTaskListIdFromRoute(): number | null {
  const taskListIdString = this.route.snapshot.paramMap.get('taskListId');
  return taskListIdString ? Number(taskListIdString) : null;
}

loadTaskDetails(taskId: number): void {
  this.ServiceTask.getTaskById(taskId).subscribe(task => {
    const formattedDateCreate = this.datePipe.transform(task.date_of_create, 'yyyy-MM-dd');
    const formattedDateExpiry = this.datePipe.transform(task.date_of_expiry, 'yyyy-MM-dd');
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      date_of_create: formattedDateCreate,
      date_of_expiry: formattedDateExpiry,
      timeSpent: task.timeSpent,
      startTime: task.startTime || 0,
      isTracking: task.isTracking || false, 
      id_task_list: task.id_task_list
    });
  });
}



formTask(): void {

  if (!this.taskForm.valid) {
    console.error("Le formulaire de tâche n'est pas valide.");
    return;
  }

  if (this.taskId !== null) {
    this.updateTask();
  } else {
    this.createTask();
  }
}

updateTask(): void {
  this.ServiceTask.updateTask(this.taskId!, this.taskForm.value).subscribe({
    next: data => {
      console.log("Tâche mise à jour avec succès", data);


     const notification = {message:'Tache modifier avec succes', date: new Date()};
     this.socketService.sendNotification(notification);

     this.notificationService.showNotification('task modifier ',{
      body:notification.message
     })
      this.router.navigate(['/task-list']);
    },
    error: error => {
      console.error("Erreur lors de la mise à jour de la tâche :", error);
    }
  });
}

createTask(): void {
  this.ServiceTask.createTask(this.taskForm.value, this.userId!).subscribe({
    next: () => {
      
      console.log('Tâche créée avec succès');
    
       
       const notification = { message: 'Tache créé avec succes ', date: new Date() };
       this.socketService.sendNotification(notification);

       
       this.notificationService.showNotification('Tache cree', {
         body: notification.message,
       });

      this.router.navigate(['/task-list']);
    },
    error: error => {
      console.error("Erreur lors de la création de la tâche :", error);
    }
  });
}
startTracking(): void {
  if (this.taskId) {
    this.ServiceTask.startTracking(this.taskId).subscribe({
      next: task => {
        this.taskForm.patchValue({
          startTime: task.startTime,
          isTracking: task.isTracking
        });
        console.log("Suivi du temps démarré", task);
      },
      error: error => {
        console.error("Erreur lors du démarrage du suivi du temps :", error);
      }
    });
  }
}

stopTracking(): void {
  if (this.taskId) {
    this.ServiceTask.stopTracking(this.taskId).subscribe({
      next: task => {
        this.taskForm.patchValue({
          timeSpent: task.timeSpent,
          startTime: task.startTime,
          isTracking: task.isTracking
        });
        console.log("Suivi du temps arrêté", task);
      },
      error: error => {
        console.error("Erreur lors de l'arrêt du suivi du temps :", error);
      }
    });
  }
}
}




