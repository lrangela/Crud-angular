import { Component, OnDestroy, OnInit } from '@angular/core';
import {  catchError, tap } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';



@Component({
  selector: 'app-view-index-post',
  templateUrl: './view-index-post.component.html',
  styleUrls: ['./view-index-post.component.scss']
})
export class ViewIndexPostComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  searchTable: string = '';

  pageItem: number[] = [0];
  page = 0;
  sizePage = 10;
  searchInput = '';

  postAll$ = this.postService.getAll().pipe(
    tap((data: Post[]) => {

      this.posts = data;
      this.onPageItems();
    }),
    catchError(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
      return EMPTY;
    })
  )

  private arraySubscription: Subscription = new Subscription();

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.arraySubscription.add(this.postAll$.subscribe());
  }

  ngOnDestroy(): void {
    this.arraySubscription.unsubscribe();
  }

  deletePost(id: number) {

    const delete$=this.postService.delete(id).pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        })
        return EMPTY;
      })
    )

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.arraySubscription.add(delete$.subscribe(res => {
          this.posts = this.posts.filter(item => item.id !== id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          this.onPageItems();
          console.log('Post deleted successfully!');
        }));

      }
    })


  }

  prevPage() {
    if (this.page >= 1) { this.page -= 1 }
  }

  nextPage() { this.page += 1 }

  onSelectSizePage(event: any) {

    this.sizePage = +event.target.value
    this.onPageItems();
  }

  onPageItems() {
    const numberpages = Math.ceil((this.posts.length) / this.sizePage);
    this.pageItem = [...Array(numberpages).keys()];
  }

}
