import { Component, OnInit} from '@angular/core';
import { TaskListInterfaceTs } from 'src/app/interface/task-list.interface.ts';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { ActivatedRoute } from '@angular/router';
import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { NgIf,NgFor } from "@angular/common";
@Component({
  selector: 'app-task-list-detail',
  standalone: true,
  imports:[NgIf,NgFor],
  templateUrl: './task-list-detail.component.html',
  styleUrls: ['./task-list-detail.component.css']
})
export class TaskListDetailComponent implements OnInit {
  taskList!:TaskListInterfaceTs;
  taskListId!:number;
  tasks!: TaskInterfaceTs[];

  constructor(
    private route: ActivatedRoute,
    private taskListService: TaskListServiceTsService,
    private taskService: TaskServiceTsService
  ) { }

  ngOnInit(): void  {
    this.loadTaskListDetails();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if(idParam !== null) {
        this.taskListId = +idParam
        this.loadTask();
      }else{
        console.log("aucune tache et trouver");
        
      }
    })
  }

  loadTask(): void {
    this.taskService.getAllTasks(this.taskListId).subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  loadTaskListDetails(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.taskListService.getTaskListById(+id).subscribe(taskList => {
        this.taskList = taskList; 
      });
    }
  }
  
}
