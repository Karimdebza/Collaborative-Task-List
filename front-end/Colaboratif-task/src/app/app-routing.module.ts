import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/form-task/task.component';
const routes: Routes = [
  
  {path:"task-list", component:TaskListComponent},
  // { path: 'task-list-detail/:id', component: TaskDetailComponent },
  { path: 'task', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
