import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerBoxComponent } from './player-box/player-box.component';
import { KeypadComponent } from './keypad/keypad.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    PlayerBoxComponent,
    KeypadComponent
  ],
  exports: [
    PlayerBoxComponent,
    KeypadComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule
  ]
})
export class DartCounterModule { }
