
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  catchError, tap,  retry, map,  filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of, Observable, throwError } from 'rxjs';

import { Post } from '../models/post';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiURL = environment.apiURL;
  private _postAll: Post[] = [];
  private postSubject = new BehaviorSubject<number>(-1);
  postAction$ = this.postSubject.asObservable();
  postIdAction$ = this.postAction$.pipe(
    filter(res => res >= 0),
    switchMap(id => this.find(id)));

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

postId$(id:number){
  this.postSubject.next(id);
}

  search = (id: number) => {
    const postOld = this._postAll.find(res => res.id == id)
    const index = this._postAll.indexOf(postOld!);
    return of(this._postAll[index])
  }

  constructor(private httpClient: HttpClient) { }

  get postAll() {
    return this._postAll;
  }

  getAll(): Observable<any> {

    if (this._postAll.length) {
      return of(this._postAll);
    } else {

      return this.httpClient.get(this.apiURL + '/posts/')
        .pipe(
          //delay(5000),
          retry(3),
          tap(res => this._postAll = res as Post[]),
          //tap(_ => console.log(this._postAll)),
          catchError(this.errorHandler)
        )
    }

  }

  create(post: Post): Observable<any> {
    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        map(res => ({ ...res, userId: 11 })),
        tap(res => this._postAll.push(res as Post)),
        catchError(this.errorHandler)
      )
  }


  find(id: number): Observable<any> {

    if (id > 100) {
      return this.search(id)
    } else {
      return this.httpClient.get(this.apiURL + '/posts/' + id)
        .pipe(
          catchError(this.errorHandler)
        )
    }

  }

  update(id: number, post: Post | undefined ): Observable<any> {

    if (id > 100) {
      return this.search(id)
    } else {
      return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
        .pipe(
          tap(res => {
            const postOld = this._postAll.find(res => res.id == id)
            const index = this._postAll.indexOf(postOld!);
            this._postAll[index] = res as Post;
          }),
          catchError(this.errorHandler)
        )
    }
  }


  delete(id: number) {

    if (id > 100) {
      return this.search(id)
    } else {

      return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
        .pipe(
          tap(() => this._postAll = this._postAll.filter(post => post.id !== id)),
          catchError(this.errorHandler)
        )
    }

  }


  errorHandler(error: any) {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);

  }


}
