import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";

interface BaseAuthRequest {
  email: string;
}

interface RegisterRequest extends BaseAuthRequest {
  password: string;
}

interface ResetPasswordRequest extends BaseAuthRequest {
}

interface LoginRequest extends BaseAuthRequest {
  password: string;
}

interface ApiBaseResponse {
  email: string;
}

interface ApiSuccessResponse extends ApiBaseResponse {
}

interface ApiErrorResponse extends ApiBaseResponse {
  message: string
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

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
