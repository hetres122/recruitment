import {inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

interface Post {
  email: string;
  password?: string;
}

interface ApiResponseModel {
  message?: string;
  email?: string;
}

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  auth(auth: Post): Observable<ApiResponseModel> {
    const postData: Post = { email: auth.email, password: auth.password };
    const url = `${this.API_URL}auth/login`;

    return this.http.post<ApiResponseModel>(url, postData);
  }

  register({ email, password }: Post): Observable<ApiResponseModel> {
    const postData: Post = { email, password };
    const url = `${this.API_URL}users`;

    return this.http.post<ApiResponseModel>(url, postData);
  }

  resetPassword({ email }: Post): Observable<ApiResponseModel> {
    const postData: Post = { email };
    const url = `${this.API_URL}users/resetPassword`

    return this.http.post<ApiResponseModel>(url, postData);
  }
}
