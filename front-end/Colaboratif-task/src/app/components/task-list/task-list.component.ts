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
userId!:number;
taskList:TaskListInterfaceTs[] = [];
constructor(private TaskService:TaskListServiceTsService,
 
){
}

ngOnInit(): void {
  this.displayAllTask();
 
}

displayAllTask(): void {
this.TaskService.getAllTaskLists(3).subscribe(taskList => {
  this.taskList = taskList;
})
}

}
