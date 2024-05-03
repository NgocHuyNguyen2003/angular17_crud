import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';
import { RouterModule } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
//fake data
export class PostService {
  private apiURL ='https://jsonplaceholder.typicode.com';
  httpOptions = {
    headers: new HttpHeaders({
      'content-Type':'application/json'
    })
  };

  constructor(private httpClient:HttpClient) { }


  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL);
  }

  
// Get all posts methods
getAll(): Observable<any> {
  return this.httpClient.get(this.apiURL + '/posts/').pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(error);
    })
  );
}
  //create 
  create(post:Post):Observable<any>{
    return this.httpClient.post(this.apiURL+'/posts',JSON.stringify(post),this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  //find 
  find(id:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'/posts/'+id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }


   // Update a post
   update_post(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
     //delete
  delete(id:number){
    return this.httpClient.delete(this.apiURL+'/posts/'+id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

