import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {MatToolbarModule} from "@angular/material/toolbar";

import {HeaderComponent} from "./components";


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
