import { Component, OnInit} from '@angular/core';
import { TaskListInterfaceTs } from 'src/app/interface/task-list.interface.ts';
import { TaskListServiceTsService } from 'src/app/services/task-list.service.ts.service';
import { ActivatedRoute } from '@angular/router';
import { TaskInterfaceTs } from 'src/app/interface/task.interface.ts';
import { TaskServiceTsService } from 'src/app/services/task.service.ts.service';
import { NgIf,NgFor } from "@angular/common";
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SocketServiceTsService } from 'src/app/services/socket.service.ts.service';
import { NotificationServiceTsService } from 'src/app/services/notification.service.ts.service';
import { Comment } from 'src/app/interface/comment';
import { CommentService } from 'src/app/services/comment.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-task-list-detail',
  standalone: true,
  imports:[NgIf,NgFor,RouterLink,DatePipe,  FormsModule],
  templateUrl: './task-list-detail.component.html',
  styleUrls: ['./task-list-detail.component.css']
})
export class TaskListDetailComponent implements OnInit {
  taskList!:TaskListInterfaceTs;
  taskListId: number | null = null;
  tasks: TaskInterfaceTs[] = [];
  taskId: number | null = null;
  comments: { [taskId: number]: Comment[] } = {};
  newComment: { [taskId: number]: string } = {};
  userid : number | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskListService: TaskListServiceTsService,
    private taskService: TaskServiceTsService,
    private socketService: SocketServiceTsService,
    private notificationService: NotificationServiceTsService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void  {
    this.userid = this.getUserIdFromLocalStorage();
    this.taskListId = this.getTaskListIdFromRoute();
    this.taskId = this.getTaskIdFromRoute();
    if (this.taskListId) {
      this.loadTaskListDetails(this.taskListId);
      if (typeof this.userid === 'number') {
      this.loadTasks();
      
      }
    } else {
      console.error("ID de la liste des tâches non trouvé");
    }
  
     
    
   
  }
  getTaskListIdFromRoute(): number | null {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? +id : null;
  }
  getUserIdFromLocalStorage(): number | null {
    const userIdString = localStorage.getItem('id_user');
    return userIdString ? Number(userIdString) : null;
  }
  getTaskIdFromRoute(): number | null {
    const taskIdString = this.route.snapshot.paramMap.get('id');
    return taskIdString ? Number(taskIdString) : null;
  }
  loadTasks(): void {
    if (typeof this.taskListId === 'number') {
    this.taskService.getAllTasks(this.taskListId).subscribe(tasks => {
      
      this.tasks = tasks;
      this.loadCommentsForTasks();
    });
  }
  }

  loadTaskListDetails(taskListId: number): void {
    this.taskListService.getTaskListById(taskListId).subscribe(taskList => {
      this.taskList = taskList;
    });
  }

  deleteTask(taskId:number): void{
    this.taskService.deleteTask(taskId).subscribe({
      next : data => {
        console.log("supression reussie", data); // Ajout du log ici pour vérifier
        
        const notification = {message:'Tache supprimer avec succes', date: new Date()};
        this.socketService.sendNotification(notification);
        console.log('Sending notification:', notification);
        this.notificationService.showNotification('tache supprimer  ',{
         body:notification.message
        })
        console.log("supression reussie", data);
        if (typeof this.taskListId !== 'number') {
          console.error("userId doit être un nombre.");
          return;
        }
        this.loadTasks(); 
       
      },
      error : error => {
        console.error("error de la supression de la tache", error);
      }
    })
  }

  startTracking(taskId: number): void {
    this.taskService.startTracking(taskId).subscribe({
      next: task => {
        const updatedTaskIndex = this.tasks.findIndex(t => t.id_task === task.id_task);
        if (updatedTaskIndex !== -1) {
          this.tasks[updatedTaskIndex] = task;
        }
        const notification = { message: `Suivi du temps démarré pour la tâche: ${task.name}`, date: new Date() };
        this.socketService.sendNotification(notification);
        this.notificationService.showNotification('Suivi du temps démarré', {
          body: notification.message
        });
        console.log('Suivi du temps démarré pour la tâche', task);
      },
      error: error => {
        console.error('Erreur lors du démarrage du suivi du temps :', error);
      }
    });
  }

  stopTracking(taskId: number): void {
    this.taskService.stopTracking(taskId).subscribe({
      next: task => {
        const updatedTaskIndex = this.tasks.findIndex(t => t.id_task === task.id_task);
        if (updatedTaskIndex !== -1) {
          this.tasks[updatedTaskIndex] = task;
        }
        const notification = { message: `Suivi du temps a été arreter  pour la tâche: ${task.name}`, date: new Date() };
        this.socketService.sendNotification(notification);
        this.notificationService.showNotification('Suivi du temps stoper', {
          body: notification.message
        });
        console.log('Suivi du temps arrêté pour la tâche', task);
      },
      error: error => {
        console.error('Erreur lors de l\'arrêt du suivi du temps :', error);
      }
    });
  }
  

  loadCommentsForTasks(): void {
    this.tasks.forEach(task => {
      this.commentService.getComments(task.id_task).subscribe({
        next: comments => {
          this.comments[task.id_task] = comments;
        },
        error: error => {
          console.error(`Erreur lors du chargement des commentaires pour la tâche ${task.id_task} :`, error);
        }
      });
    });
  }

  addComment(taskId:number):void {
    if (!this.newComment[taskId]?.trim()) {
      return;
    }

    const comment = {
      content: this.newComment[taskId],
      id_user: this.userid,
      id_task: taskId
    };

  this.commentService.addComment(comment).subscribe({
    next : newComment => {
      if (!this.comments[taskId]) {
        this.comments[taskId] = [];
      }
      this.comments[taskId].push(newComment);
      this.newComment[taskId] = '';
        const notification = { message: `Nouveau commentaire ajouté pour la tâche: ${newComment.content}`, date: new Date() };
        this.socketService.sendNotification(notification);
        this.notificationService.showNotification('Nouveau commentaire', {
          body: notification.message
        });
    },
    error: error => {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
      }
  
  });
  }

  deleteComment(commentId: number, taskId: number): void {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments[taskId] = this.comments[taskId].filter(comment => comment.id_comment !== commentId);
      },
      error: error => {
        console.error('Erreur lors de la suppression du commentaire :', error);
      }
    });
  }
}


