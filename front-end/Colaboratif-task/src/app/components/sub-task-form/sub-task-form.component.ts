import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubTaskService } from '../../services/sub-task.service';
import { DatePipe } from '@angular/common';
import { SocketServiceTsService } from '../../services/socket.service.ts.service';
import { NotificationServiceTsService } from '../../services/notification.service.ts.service';

@Component({
  selector: 'app-sub-task-form',
  templateUrl: './sub-task-form.component.html',
  styleUrls: ['./sub-task-form.component.css']
})
export class SubTaskFormComponent implements OnInit {
  subTaskForm!: FormGroup;
  taskId: number | null = null;
  subTaskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: SubTaskService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private socketService: SocketServiceTsService,
    private notificationService: NotificationServiceTsService
  ) {}

  ngOnInit(): void {
    this.taskId = this.getTaskIdFromRoute();
    this.subTaskId = this.getSubTaskIdFromRoute();
    this.initializeForm();
    
    if (this.subTaskId) {
      this.loadSubTaskDetails(this.subTaskId);
    }
  }

  initializeForm(): void {
    this.subTaskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date_of_create: [new Date(), Validators.required],
      date_of_expiry: [new Date(), Validators.required],
      isCompleted: [false]
    });
  }

  getTaskIdFromRoute(): number | null {
    const taskIdString = this.route.snapshot.paramMap.get('id');
    return taskIdString ? +taskIdString : null;
  }

  getSubTaskIdFromRoute(): number | null {
    const subTaskIdString = this.route.snapshot.paramMap.get('id');
    return subTaskIdString ? +subTaskIdString : null;
  }

  loadSubTaskDetails(subTaskId: number): void {
    this.taskService.getSubTaskById(subTaskId).subscribe(subTask => {
      const formattedDateCreate = this.datePipe.transform(subTask.date_of_create, 'yyyy-MM-dd');
      const formattedDateExpiry = this.datePipe.transform(subTask.date_of_expiry, 'yyyy-MM-dd');
      this.subTaskForm.patchValue({
        name: subTask.name,
        description: subTask.description,
        date_of_create: formattedDateCreate,
        date_of_expiry: formattedDateExpiry,
        isCompleted: subTask.isCompleted
      });
    });
  }

  submitForm(): void {
    if (this.subTaskForm.valid) {
      if (this.subTaskId !== null) {
        this.updateSubTask();
      } else {
        this.createSubTask();
      }
    }
  }

  updateSubTask(): void {
    this.taskService.updateSubTask(this.subTaskId!, this.subTaskForm.value).subscribe({
      next: () => {
        console.log('Sous-tâche mise à jour avec succès');
        this.handleSuccess('modifiée');
      },
      error: error => {
        console.error('Erreur lors de la mise à jour de la sous-tâche :', error);
      }
    });
  }

  createSubTask(): void {
    this.taskService.createSubTask(this.taskId!, this.subTaskForm.value).subscribe({
      next: () => {
        console.log('Sous-tâche créée avec succès');
        this.handleSuccess('créée');
      },
      error: error => {
        console.error('Erreur lors de la création de la sous-tâche :', error);
      }
    });
  }

  handleSuccess(action: string): void {
    const notification = { message: `Sous-tâche ${action} avec succès`, date: new Date() };
    this.socketService.sendNotification(notification);
    this.notificationService.showNotification(`Sous-tâche ${action}`, { body: notification.message });
    this.router.navigate(['/task', this.taskId]);
  }

  cancel(): void {
    this.router.navigate(['/task', this.taskId]);
  }
}
