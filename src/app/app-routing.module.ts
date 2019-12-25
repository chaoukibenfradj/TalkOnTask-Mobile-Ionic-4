import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './utils/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {

    path: 'chat-list-messages/:id',
    loadChildren: './chat-list-messages/chat-list-messages.module#ChatListMessagesPageModule'
  },
  {
    path: 'chat-friends-list',
    loadChildren: './chat-friends-list/chat-friends-list.module#ChatFriendsListPageModule'
  },
  {
    path: 'project-add',
    loadChildren: './project-add/project-add.module#ProjectAddPageModule'
  },
  { path: 'task-add/:idProject', loadChildren: './task-add/task-add.module#TaskAddPageModule' },

  { path: 'project-see/:id', loadChildren: './project-see/project-see.module#ProjectSeePageModule' },
  { path: 'profil-details', loadChildren: './profil-details/profil-details.module#ProfilDetailsPageModule' },
  { path: 'list-projects', loadChildren: './list-projects/list-projects.module#ListProjectsPageModule' },
  { path: 'task-details/:idTask', loadChildren: './task-details/task-details.module#TaskDetailsPageModule' },
  { path: 'task-update/:idTask', loadChildren: './task-update/task-update.module#TaskUpdatePageModule' },  { path: 'task-request-list', loadChildren: './task-request-list/task-request-list.module#TaskRequestListPageModule' }







];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
