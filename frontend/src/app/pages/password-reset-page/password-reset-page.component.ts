import {Component, inject, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {ButtonSubmitComponent, EmailFormComponent, InputComponent, InputIconComponent} from "../../components/atoms";
import {PostsService} from "../../core/services/posts.service";

@Component({
  standalone: true,
  selector: "app-password-reset-page",
  templateUrl: "./password-reset-page.component.html",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputIconComponent,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterLink,
    EmailFormComponent,
    InputComponent,
    ButtonSubmitComponent,
  ],
  styleUrls: ["./password-reset-page.component.scss"],
})
export class PasswordResetPageComponent implements OnInit {
  public resetForm!: FormGroup;
  public showMessage: boolean = false;
  public responseMessage: string = "";
  public isError: boolean = false;
  public isLoading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private postService = inject(PostsService);

  get email(): FormControl {
    return this.resetForm.get("emailGroup.email") as FormControl;
  }

  ngOnInit(): void {
    this.setResetFormControls();
  }

  public onSubmit(): void {
    const email = this.email.value.trim();
    this.isLoading = true;

    this.postService.resetPassword({email}).subscribe({
      next: () => {
        this.responseMessage = "Email został wysłany";
        this.isError = false;
        this.resetForm.reset();
        this.email?.setErrors(null);
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
        this.showMessage = true
        this.responseMessage = "Błędny email";
      },
      complete: () => {
        this.showMessage = true;
        this.isLoading = false;
      },
    });
  }

  private setResetFormControls(): void {
    this.resetForm = this.formBuilder.group({
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      })
    });
  }
}
