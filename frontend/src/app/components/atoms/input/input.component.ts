import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {InputIconComponent} from "../input-icon/input-icon.component";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, InputIconComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  public emailForm!: FormGroup;

  private controlContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.emailForm = this.controlContainer.control?.get('emailGroup') as FormGroup;
  }

  get email() {
    return this.emailForm.get('email') as FormControl;
  }

}
