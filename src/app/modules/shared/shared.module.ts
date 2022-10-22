import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChartComponent } from './components/chart/chart.component';

// angular material
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'


import {NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    NavBarComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,

    NgxChartsModule,

  ],
  exports: [
    NavBarComponent,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ChartComponent,


  ]
})
export class SharedModule { }
