import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  catchError } from 'rxjs/operators';
import { Subscription, EMPTY } from 'rxjs';
import Swal from 'sweetalert2';

import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  formCreate!: FormGroup;
  private arraySubscription: Subscription = new Subscription();


  constructor(
    public postService: PostService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.formCreate = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });

  }

  ngOnDestroy(): void {
    this.arraySubscription.unsubscribe();
  }


  get f() {
    return this.formCreate.controls;
  }


  submit() {

    console.log(this.formCreate.value);

    const create$ = this.postService.create(this.formCreate.value).pipe(
      catchError(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        })
        return EMPTY;
      })
    )

    create$.subscribe(() => {
      console.log('Post created successfully!');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('post/index');
    })
  }

  onBack() {
    this.router.navigateByUrl('post/index');
  }

}
