import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from "./components";
import {MatToolbarModule} from "@angular/material/toolbar";



@NgModule({
  declarations: [ HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    NgOptimizedImage
  ],
  exports: [ HeaderComponent]
})
export class CoreModule { }
