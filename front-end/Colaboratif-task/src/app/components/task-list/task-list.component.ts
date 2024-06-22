import { Component, OnInit} from '@angular/core';
import { TaskListInterfaceTs } from 'src/app/interface/task-list.interface.ts';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
userId:number |null = null;
taskList:TaskListInterfaceTs[] = [];
taskListId : number | null = null;; // ID de la liste de tâches à mettre à jour
  isPublic = true; 
constructor(private TaskService:TaskListServiceTsService, private route:ActivatedRoute
 
){
}

ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
  this.taskListId = this.getTaskListIdFromRoute();
  this.displayAllTask();
}

displayAllTask(): void {
  if (typeof this.userId === 'number') {
    this.TaskService.getAllTaskLists(this.userId).subscribe(taskList => {
      this.taskList = taskList; 
     });
  }
}
getTaskListIdFromRoute(): number | null {
  const id = this.route.snapshot.paramMap.get('id');
  return id ? +id : null;
}

updateVisibility(): void {
  if (typeof this.userId  === 'number') {
    if(this.taskListId !== null)
  this.TaskService.updateTaskListVisibility(this.taskListId, this.isPublic).subscribe(
    {
      next : data => {
        console.log('Visibilité mise à jour avec succès :',data);
        
      },
      error : error => {
        console.error('Erreur lors de la mise à jour de la visibilité :', error);
      }
    })
  }
  }
}



