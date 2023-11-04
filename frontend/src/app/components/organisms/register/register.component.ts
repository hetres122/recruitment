import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {PasswordValidationErrors} from "../../interface/password-validation";
import {IconComponent} from "../../atoms";


@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    IconComponent
  ],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }

  ngOnInit() {
    this.setRegisterFormControls();
  }

  private setRegisterFormControls() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.passwordMatchValidator})
  }

  private passwordValidator(control: FormControl) {
    const {value} = control;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);

    const errors: PasswordValidationErrors = {};

    !hasUpperCase && (errors['missingUpperCase'] = true);
    !hasLowerCase && (errors['missingLowerCase'] = true);
    !hasDigit && (errors['missingDigit'] = true);

    return hasUpperCase || hasLowerCase || hasDigit ? errors : null;
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword) {
      const error = password.value === confirmPassword.value ? null : {passwordMismatch: true};
      confirmPassword.setErrors(error)
    }
  }
}
