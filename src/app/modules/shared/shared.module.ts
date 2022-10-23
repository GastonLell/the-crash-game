import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// custom components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChartComponent } from './components/chart/chart.component';

// angular material
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'

import {NgxChartsModule } from '@swimlane/ngx-charts';
import { BetsComponent } from './components/bets/bets.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavBarComponent,
    ChartComponent,
    BetsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    RouterModule,
    MatTableModule,

    NgxChartsModule,

  ],
  exports: [
    NavBarComponent,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ChartComponent,
    BetsComponent,
    MatTableModule

  ]
})
export class SharedModule { }
