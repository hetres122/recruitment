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
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from '@ngx-translate/core';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {ButtonSubmitComponent, InputIconComponent} from "@components/atoms";
import {EmailFormComponent} from "@components/molecules"
import {PostsService} from "@core/services";

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
    EmailFormComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterLink,
    ButtonSubmitComponent,
    TranslateModule,
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
  private translate = inject(TranslateService);

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
        this.translate.get("messageAlreadySent").subscribe((translation: string) => {
          this.responseMessage = translation;
        });
        this.isError = false;
        this.resetForm.reset();
        this.email.setErrors(null);
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
        this.showMessage = true
        this.translate.get("messageErrorEmailExist").subscribe((translation: string) => {
          this.responseMessage = translation;
        });
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
