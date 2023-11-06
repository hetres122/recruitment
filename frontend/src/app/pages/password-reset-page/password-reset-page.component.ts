import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgClass, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import {IconComponent} from "../../components/atoms";
import {PostsService} from "../../core/services/posts.service";

@Component({
  standalone: true,
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    IconComponent,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit {
  public resetForm!: FormGroup;
  public showMessage: boolean = false;
  public textMessage: string = '';
  public isError: boolean = false;

  get email(): FormControl {
    return this.resetForm.get('email') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private postService: PostsService) {
  }

  ngOnInit() {
    this.setResetFormControls()
  }

  private setResetFormControls() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public onSubmit() {
    let authObs: Observable<any>;
    console.log(this.resetForm.value);
    authObs = this.postService.resetPost(this.resetForm.value);

    authObs.subscribe(
      response => {
        console.log('Response: ', response);
        this.showMessage = true;
        this.isError = false;
        this.textMessage = 'Email został wysłany';
        this.resetForm.reset();
      },
      error => {
        this.showMessage = true;
        this.isError = true;
        this.textMessage = 'Błędny email';
        console.error('Error: ', error);
      }
    );
  }
}
