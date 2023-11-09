import {Component, Input} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-input-icon',
  templateUrl: './input-icon.component.html',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./input-icon.component.scss']
})
export class InputIconComponent {
  @Input({ required: true })  public isInputValid!: boolean;
  @Input({ required: true })  public isTouched!: boolean;
}
