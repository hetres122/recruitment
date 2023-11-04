import {Component, inject, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {IconComponent} from "../../atoms";
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  imports: [
    MatInputModule,
    IconComponent,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  public emailForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.setEmailFormControls();
  }
  get email(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  private setEmailFormControls(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
}
