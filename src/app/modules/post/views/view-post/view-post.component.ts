import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EMPTY } from 'rxjs';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postAction$= this.postService.postIdAction$.pipe(
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

  constructor(
    private postService: PostService,
    private readonly route: ActivatedRoute,
    private router: Router) {  }

  ngOnInit(): void {

    const param = this.route.snapshot.params['postId'] 
    if(param)
      this.postService.postId$(+param);

  }

  onBack() {
    this.router.navigateByUrl('post/index');
  }


}
