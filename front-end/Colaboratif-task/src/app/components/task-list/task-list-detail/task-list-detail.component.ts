import { Component, OnInit} from '@angular/core';
import { TaskListInterfaceTs } from 'src/app/interface/task-list.interface.ts';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { ActivatedRoute } from '@angular/router';
import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { NgIf,NgFor } from "@angular/common";
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-list-detail',
  standalone: true,
  imports:[NgIf,NgFor,RouterLink,DatePipe],
  templateUrl: './task-list-detail.component.html',
  styleUrls: ['./task-list-detail.component.css']
})
export class TaskListDetailComponent implements OnInit {
  taskList!:TaskListInterfaceTs;
  taskListId: number | null = null;
  tasks!: TaskInterfaceTs[];
  taskId!:number;

  constructor(
    private route: ActivatedRoute,
    private taskListService: TaskListServiceTsService,
    private taskService: TaskServiceTsService
  ) { }

  ngOnInit(): void  {
    this.taskListId = this.getTaskListIdFromRoute();
    if (this.taskListId) {
      this.loadTaskListDetails(this.taskListId);
      this.loadTasks(this.taskListId);
    } else {
      console.error("ID de la liste des tâches non trouvé");
    }
  }
  getTaskListIdFromRoute(): number | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : null;
  }

  loadTasks(taskListId: number): void {
    this.taskService.getAllTasks(taskListId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  loadTaskListDetails(taskListId: number): void {
    this.taskListService.getTaskListById(taskListId).subscribe(taskList => {
      this.taskList = taskList;
    });
  }

  deleteTask(taskId:number): void{
    this.taskService.deleteTask(taskId).subscribe({
      next : data => {
        console.log("supression reussie", data);
        if (typeof this.taskListId !== 'number') {
          console.error("userId doit être un nombre.");
          return;
        }
        this.loadTasks(this.taskListId); 
        
      },
      error : error => {
        console.error("error de la supression de la tache", error);
      }
    })
  }
  
}
