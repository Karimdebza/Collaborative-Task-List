import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubTaskService } from '../../services/sub-task.service';
import { SubTask } from '../../interface/sub-task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketServiceTsService } from 'src/app/services/socket.service.ts.service';
import { NotificationServiceTsService } from 'src/app/services/notification.service.ts.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sub-task-form',
  templateUrl: './sub-task-form.component.html',
  styleUrls: ['./sub-task-form.component.css']
})
export class SubTaskFormComponent implements OnInit {
  subTaskForm!: FormGroup;
  taskId: number | null = null;
  subTaskId: number | null = null;
  isEditMode = false; 
  tags: string[] = [];
  
  constructor(private taskService: SubTaskService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private socketService:SocketServiceTsService,
    private notificationService: NotificationServiceTsService,
    private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    this.taskId = this.getTaskIdFromRoute();
    this.subTaskId = this.getSubTaskIdFromRoute();
    this.subTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date_of_create: ['', Validators.required],
      date_of_expiry: ['', Validators.required],
      isCompleted: [false]
    });
    if (this.subTaskId !== null && this.subTaskId !== undefined) {
      this.loadSubTask();
    } else {
      console.error('subTaskId est null ou undefined, impossible de charger la sous-tâche.');
    }
     
    
  }
  getTaskIdFromRoute(): number | null {
    const taskIdString = this.route.snapshot.paramMap.get('id');
    return taskIdString ? Number(taskIdString) : null;
  }
  private getSubTaskIdFromRoute(): number | null {
    const subTaskIdString = this.route.snapshot.paramMap.get('id');
    return subTaskIdString ? Number(subTaskIdString) : null;
  }

  loadSubTask(): void {
    if (this.subTaskId !== null && this.subTaskId !== undefined) {
      this.taskService.getSubTaskById(this.subTaskId).subscribe({
        next: (subTask: SubTask) => {
          if (subTask) {
            const formattedDateCreate = this.datePipe.transform(subTask.date_of_create, 'yyyy-MM-dd');
            const formattedDateExpiry = this.datePipe.transform(subTask.date_of_expiry, 'yyyy-MM-dd');
            this.subTaskForm.patchValue({
              name: subTask.name ,  
              description: subTask.description ,
              date_of_create: formattedDateCreate ,
              date_of_expiry: formattedDateExpiry ,
              isCompleted: subTask.isCompleted   
            });
          } else {
            console.error(`Aucune sous-tâche trouvée avec l'ID ${this.subTaskId}`);
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la sous-tâche : ', error);
          
        }
      });
    } else {
      console.error('subTaskId est null ou undefined, impossible de charger la sous-tâche.');
    }
  }
  
  

  submitForm(): void {
    if (this.subTaskForm.valid) {
      if (this.subTaskId !== null) {
        this.updateSubTask();
      } else {
        this.createSubTask();
      }
    } else {
      this.markFormGroupTouched(this.subTaskForm); 
    }
  }
  updateSubTask(): void {
    this.taskService.updateSubTask(this.subTaskId!, this.subTaskForm.value).subscribe({
      next: data => {
        console.log("Sous-tâche mise à jour avec succès", data);
  
        const notification = { message: 'Sous-tâche modifiée avec succès', date: new Date() };
        this.socketService.sendNotification(notification);
  
        this.notificationService.showNotification('Sous-tâche modifiée', {
          body: notification.message
        });
  
       
        this.router.navigate(['/task', this.taskId]);
      },
      error: error => {
        console.error("Erreur lors de la mise à jour de la sous-tâche :", error);
       
      }
    });
  }
  createSubTask(): void {
    
    this.taskService.createSubTask(this.taskId!,this.subTaskForm.value).subscribe({
      next: () => {
        console.log('Sous-tâche créée avec succès');
  
        const notification = { message: 'Sous-tâche créée avec succès', date: new Date() };
        this.socketService.sendNotification(notification);
  
        this.notificationService.showNotification('Sous-tâche créée', {
          body: notification.message,
        });
  
       
        this.router.navigate(['/task', this.taskId]);
      },
      error: error => {
        console.error("Erreur lors de la création de la sous-tâche :", error);
        
      }
    });
  }
      

  cancel(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (taskId) {
      this.router.navigate(['/task', taskId]);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  
}
