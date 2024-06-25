import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { SubTask } from "../../interface/sub-task"
import { SubTaskService } from 'src/app/services/sub-task.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: TaskInterfaceTs | undefined;
  subtasks: SubTask[] = []; 

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceTsService,
    private subtaskService: SubTaskService,
    private datePipe: DatePipe,
  ) {
    this.subtasks = [];
  }

  ngOnInit(): void {
    this.loadTaskDetails();
    this.loadSubtasks();
  }

  loadTaskDetails(): void {
    const taskId = this.route.snapshot.params['id'];
    this.taskService.getTaskById(taskId).subscribe(task => {
      this.task = task;
    });
  }

  loadSubtasks(): void {
    const taskId = this.route.snapshot.params['id'];
    this.subtaskService.getAllSubTasks(taskId).subscribe(subtasks => {
      this.subtasks = subtasks;
    });
  }

  deleteSubtask(subtaskId: number): void {
    if (subtaskId === undefined) {
      console.error('Invalid subtask ID');
      return;
    }else{
    this.subtaskService.deleteSubTask(subtaskId).subscribe(() => {
      this.loadSubtasks();
    });
  }
  }

  

 
}
