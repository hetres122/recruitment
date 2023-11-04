import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./icon.component.scss']
})

export class IconComponent{
  @Input()  public isInputValid!: boolean | undefined;
  @Input()  public isTouched!: boolean | undefined;
  constructor() {
  }

}
