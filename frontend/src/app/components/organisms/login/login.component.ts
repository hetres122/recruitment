import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Observable} from "rxjs";

import {IconComponent} from "../../atoms";
import {EmailFormComponent} from "../../molecules/email-form/email-form.component";
import {InputComponent} from "../../atoms";
import {PostsService} from "../../../core/services/posts.service";


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    MatIconModule,
    IconComponent,
    EmailFormComponent,
    InputComponent,
    NgClass,
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public showMessage: boolean = false;
  public textMessage: string = '';
  public isError: boolean = false;


  constructor(private formBuilder: FormBuilder, private postService: PostsService) {
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  ngOnInit() {
    this.setLoginFormControls()
  }

  private setLoginFormControls() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    let authObs: Observable<any>;

    authObs = this.postService.authPost(this.loginForm.value);

    authObs.subscribe(
      response => {
        console.log('Response: ', response);
        this.showMessage = true;
        this.isError = false;
        this.textMessage = `Udało się zalogować na konto: ${this.loginForm.value.email}`;
        this.loginForm.reset();
      },
      error => {
        this.showMessage = true;
        this.isError = true;
        this.textMessage = `Błędny email lub hasło`;
        console.error('Error: ', error);
      }
    );
  }
}
