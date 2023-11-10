import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "@environments/environment";
import {ApiResponse, LoginRequest, RegisterRequest, ResetPasswordRequest} from "@models/auth-interfaces";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private http = inject(HttpClient);
  private readonly API_URL: URL = new URL(environment.apiUrl);

  login(loginRequest: LoginRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}auth/login`;

    return this.http.post<ApiResponse>(url, loginRequest);
  }

  register(registerRequest: RegisterRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}users`;

    return this.http.post<ApiResponse>(url, registerRequest);
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ApiResponse> {
    const url = `${this.API_URL}users/resetPassword`

    return this.http.post<ApiResponse>(url, resetPasswordRequest);
  }
}
