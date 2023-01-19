import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, concatMap } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  form: FormGroup;
  postA$= this.postService.postIdAction$.pipe(
    catchError(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err,
      })
      this.router.navigateByUrl('post/index');
      return EMPTY;
    })
  );

  private arraySubscription: Subscription = new Subscription();

  constructor(
    public postService: PostService,
    private readonly route: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });

  }


  ngOnInit(): void {
    const param = this.route.snapshot.params['postId'] 
    if(param)
      this.postService.postId$(+param);
  }


  ngOnDestroy(): void {
    this.arraySubscription.unsubscribe();
  }


  get f() {
    return this.form.controls;
  }

  submit() {

    console.log(this.form.value);
    const update$=this.postService.postAction$.pipe(
      concatMap(val=>this.postService.update(val, this.form.value).pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          })
          return EMPTY;
        })
      ))
    )

    this.arraySubscription.add (update$.subscribe((res: any) => {

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      console.log('Post updated successfully!');

      this.router.navigateByUrl('post/index');

    }))

  }

}
