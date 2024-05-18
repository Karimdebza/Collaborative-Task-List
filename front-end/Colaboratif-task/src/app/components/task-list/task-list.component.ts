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
constructor(private TaskService:TaskListServiceTsService, private route:ActivatedRoute
 
){
}

ngOnInit(): void {
  const userIdString = localStorage.getItem('id_user');
  console.log('ID de l\'utilisateur :', userIdString); // Vérifier la valeur de l'ID dans la console
  this.userId = userIdString ? Number(userIdString) : null;
      this.displayAllTask();
}

displayAllTask(): void {
    this.TaskService.getAllTaskLists().subscribe(taskList => {
      this.taskList = taskList; 
     });
}

CreateTaskList(){
  
}
}

