import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ViewIndexPostComponent } from './views/view-index-post/view-index-post.component';
import { SearchfilterPipe } from './pipe/searchfilter.pipe';
import { PaginationPipe } from './pipe/pagination.pipe';
import { ViewPostComponent } from './views/view-post/view-post.component';

@NgModule({
  declarations: [
    ViewIndexPostComponent,
    CreatePostComponent,
    EditPostComponent,
    PaginationPipe,
    SearchfilterPipe,
    ViewPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PostRoutingModule
  ]
})
export class PostModule { }
