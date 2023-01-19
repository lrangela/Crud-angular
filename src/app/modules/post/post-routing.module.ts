import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ViewPostComponent } from './views/view-post/view-post.component';
import { ViewIndexPostComponent } from './views/view-index-post/view-index-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'post/index', pathMatch: 'full'},

  { path: 'post/index', component: ViewIndexPostComponent },

  { path: 'post/:postId/view', component: ViewPostComponent },

  { path: 'post/create', component: CreatePostComponent },

  { path: 'post/:postId/edit', component: EditPostComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
