import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { TaskListComponent } from './components/task-list/task-list';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '**', redirectTo: '' }
];
