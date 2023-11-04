import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {IconComponent} from "../../atoms";
import {EmailFormComponent} from "../../molecules/email-form/email-form.component";
import {InputComponent} from "../../atoms";

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
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {
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
}
