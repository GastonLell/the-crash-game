import {  Component, OnInit, HostListener  } from '@angular/core';
import { Color } from 'node_modules/@swimlane/ngx-charts/lib/utils/color-sets';
import { DataChart } from 'src/app/core/interface/GamesPlayed';
import { CrashService } from 'src/app/core/services/crash.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public dataCrash: DataChart[] = [];
  view: [number, number] = [0,0];
  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'X';
  yAxisLabel: string = 'Time';
  timeline: boolean = true;
  rotateXAxisTicks: boolean = false;

  colorScheme = {
    domain: ['#5AA454', 'transparent'],
  } as Color;

  public data = [
    {
      name: 'Crash',
      series: this.dataCrash,
    },
    {
      name: '',
      series: [
        { name: '0', value: 7.5 },
        { name: '0', value: 7 },
        { name: '0', value: 6.5 },
        { name: '0', value: 6 },
        { name: '1', value: 5.5 },
        { name: '2', value: 5 },
        { name: '3', value: 4.5 },
        { name: '4', value: 4 },
        { name: '5', value: 3.5},
        { name: '6', value: 3 },
        { name: '7', value: 2.5 },
        { name: '8', value: 2 },
        { name: '9', value: 1.5 },
        { name: '10', value: 1 },
      ],
    },
  ];


  constructor(private crashService: CrashService) {
    this.getScreenWidth = window.innerWidth;

    this.checkSize(this.getScreenWidth)

  }

  public getScreenWidth: any;
  ngOnInit(): void {

    this.getCrashData()
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.checkSize(this.getScreenWidth)
  }

  getCrashData(){
    this.crashService.dataCrash$.subscribe((resp: DataChart[]) => {
      this.data[0].series = resp;
      this.data = [...this.data]
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private checkSize(size: number){
    if(size < 4000 && size > 992){
      this.view = [this.getScreenWidth - 500, 400]
    }
    if(size < 360){
      this.view = [320, 400]
    }
    if(size < 992 && size > 360){
      this.view = [this.getScreenWidth - 40, 400]
    }

  }

}
