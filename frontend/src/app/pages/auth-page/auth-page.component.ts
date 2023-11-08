import {Component, ViewChild} from '@angular/core';
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";

import {RegisterComponent} from "@organisms/register/register.component";
import {LoginComponent} from "@organisms/login/login.component";

@Component({
  standalone: true,
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  imports: [
    MatTabsModule,
    RegisterComponent,
    LoginComponent
  ],
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  public changeToLoginTab(): void {
    this.matTabGroup.selectedIndex = 0;
  }
}
