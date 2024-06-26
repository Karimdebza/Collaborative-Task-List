import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent {
listForm!:FormGroup;
userId:number | null = null;
taskListId: number | null = null;
isEditing: boolean = false;

constructor(private Form:FormBuilder, private ServiceTask:TaskListServiceTsService, private router:Router, private route: ActivatedRoute,  private datePipe: DatePipe){}


ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
  this.taskListId = this.getTaskListIdFromRoute();
  this.isEditing = !!this.taskListId;
  this.listForm = this.Form.group({
    title: ['', Validators.required],
    date_of_create: [new Date(), Validators.required],
    is_public: [false, Validators.required],
  })
  if (this.isEditing && this.taskListId) {

    this.ServiceTask.getTaskListById(this.taskListId).subscribe(taskList => {
      const formattedDateCreate = this.datePipe.transform(taskList.date_of_create, 'yyyy-MM-dd');
      this.listForm.patchValue({
        title: taskList.title,
        date_of_create: formattedDateCreate,
        is_public: taskList.is_public
      });
    });
  }
}

getTaskListIdFromRoute(): number | null {
  const id = this.route.snapshot.paramMap.get('id');
  return id ? +id : null;
}

createListTask(): void {
    if (this.listForm.valid) {
      const taskListData = this.listForm.value;
      if (this.taskListId) {
        this.ServiceTask.updateTaskList(this.taskListId, taskListData).subscribe({
          next: () => {
            console.log('Liste des tâches mise à jour');
            this.router.navigate(['/task-list']); // Rediriger après la mise à jour
          },
          error: error => {
            console.error('Erreur lors de la mise à jour de la liste des tâches :', error);
          }
        });
      } else {
        if(this.userId !== null)
        this.ServiceTask.createTaskList(taskListData,this.userId).subscribe({
          next: () => {
            console.log('Liste des tâches créée');
            this.router.navigate(['/task-list']); // Rediriger après la création
          },
          error: error => {
            console.error('Erreur lors de la création de la liste des tâches :', error);
          }
        });
      }
      }
    }

  
  }



