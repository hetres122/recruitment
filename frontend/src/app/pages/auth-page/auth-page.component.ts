import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {RegisterComponent} from "../../components/organisms/register/register.component";
import {LoginComponent} from "../../components/organisms/login/login.component";

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

}
