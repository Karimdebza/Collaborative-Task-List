import { Component, OnInit } from '@angular/core';
import { TaskServiceTsService } from '../../services/task.service.ts.service';
import { TaskInterfaceTs } from '../../interface/task.interface.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  toDoTasks: TaskInterfaceTs[] = [];
  inProgressTasks: TaskInterfaceTs[] = [];
  completedTasks: TaskInterfaceTs[] = [];
  taskListId:number | null = null;
  
  constructor(private taskService: TaskServiceTsService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.taskListId = this.getTaskListIdFromRoute();
    this.loadTasks();
  }

  getTaskListIdFromRoute(): number | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : null;
  }

  loadTasks() {
    if (typeof this.taskListId === 'number') {
      this.taskService.getTasksByStatus(this.taskListId, 'to-do').subscribe(tasks => {
        console.log('To-Do Tasks:', tasks); // Vérifiez ici
        this.toDoTasks = tasks;
      });
      this.taskService.getTasksByStatus(this.taskListId, 'in-progress').subscribe(tasks => {
        console.log('In-Progress Tasks:', tasks); // Vérifiez ici
        this.inProgressTasks = tasks;
      });
      this.taskService.getTasksByStatus(this.taskListId, 'completed').subscribe(tasks => {
        console.log('Completed Tasks:', tasks); // Vérifiez ici
        this.completedTasks = tasks;
      });
    }
  }
  
  

  onTaskDrop(event: DragEvent, newStatus: string) {
    event.preventDefault();
    const taskId = Number(event.dataTransfer?.getData('text'));
    if (!isNaN(taskId)) {
      this.taskService.updateTaskStatus(taskId, newStatus).subscribe(() => {
        this.loadTasks();
      });
    }
  }
  
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  
  drag(event: DragEvent, taskId: number) {
    event.dataTransfer?.setData('text', taskId.toString());
  }
  
}

