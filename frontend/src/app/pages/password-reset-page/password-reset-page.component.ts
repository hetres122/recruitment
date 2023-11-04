import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {IconComponent} from "../../components/atoms";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

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
        ReactiveFormsModule
    ],
    styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit{
  public resetForm!: FormGroup;

  get email(): FormControl {
    return this.resetForm.get('email') as FormControl;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.setResetFormControls()
  }
  private setResetFormControls() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

}
