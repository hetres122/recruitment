import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

import {environment} from "../../../environments/environment";

interface Post {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  authPost(auth: Post): Observable<any> {
    const postData: Post = {email: auth.email, password: auth.password};
    return this.http.post(environment.loginUrl, postData);
  }

  registerPost(auth: Post): Observable<any> {
    const postData: Post = {email: auth.email, password: auth.password};
    return this.http.post(environment.registerUrl, postData);
  }

  resetPost(auth: Post): Observable<any> {
    const postData: Post = {email: auth.email, password: auth.password};
    return this.http.post(environment.resetUrl, postData);
  }
}
