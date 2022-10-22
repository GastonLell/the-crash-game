import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
  constructor(private crashService: CrashService) {}
  ngOnInit(): void {
    this.crashService.newGame().subscribe((resp) => {
      this.data[0].series = [...this.data[0].series, resp];


      this.data = [...this.data]
      console.log(resp);
    });
  }

  view: [number, number] = [900, 400];
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
        { name: '0', value: 6 },
        { name: '0', value: 5 },
        { name: '0', value: 4.5 },
        { name: '0', value: 4 },
        { name: '1', value: 3.5 },
        { name: '2', value: 3 },
        { name: '3', value: 2.5 },
        { name: '4', value: 2 },
        { name: '5', value: 1.5},
        { name: '6', value: 1 },
        { name: '7', value: 0.5 },
        { name: '8', value: 0 },
        { name: '9', value: 0 },
        { name: '10', value: 0 },
      ],
    },
  ];
  // [
  //   {
  //     "value": 0,
  //     "name": "0"
  //   },
  //   {
  //     "value": 45,
  //     "name": "1"
  //   },
  //   {
  //     "value": 50,
  //     "name": "2"
  //   },
  //   {
  //     "value": 100,
  //     "name": "3"
  //   },
  //   {
  //     "value": 200,
  //     "name": "4"
  //   },
  //   {
  //     "value": 500,
  //     "name": "5"
  //   },

  // ]

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
