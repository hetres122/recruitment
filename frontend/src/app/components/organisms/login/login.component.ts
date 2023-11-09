import {Component, inject, OnInit,} from "@angular/core";
import {RouterLink} from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {ButtonSubmitComponent, InputComponent} from "../../atoms";
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
    CommonModule,
    MatIconModule,
    InputComponent,
    MatProgressSpinnerModule,
    ButtonSubmitComponent,
    TranslateModule,
  ],
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public showMessage: boolean = false;
  public responseMessage: string = "";
  public isError: boolean = false;
  public isLoading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private postService = inject(PostsService);

  ngOnInit(): void {
    this.setLoginFormControls();
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  get email(): FormControl {
    return this.loginForm.get("emailGroup.email") as FormControl;
  }

  public onSubmit():void {
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    this.isLoading = true;


    this.postService.login({email, password}).subscribe({
      next: (response) => {
        this.isError = false;
        this.responseMessage = `Zostałeś zalogowany: ${response.email}`;
      },
      error: () => {
        this.isError = true;
        this.showMessage = true;
        this.isLoading = false;
        this.responseMessage = "Błędny email lub hasło";
      },
      complete: () => {
        this.resetLoginForm();
        this.showMessage = true;
        this.isLoading = false;
      },
    });
  }

  private setLoginFormControls(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      })
    });
  }

  private resetLoginForm(): void {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.setErrors(null);
    });
  }
}
