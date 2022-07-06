import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [DataLabelsPlugin]
  private todayDate = new Date();

  private _barChartDates!: string[];
  private allDates!: string[];
  @Input()
  public set barChartDates(dates: string[]) {
    this.allDates = [...dates];
    // show last month only
    const startDayOfLastMonth = moment(this.todayDate).subtract(1, 'month').format('LLLL');
    const today = moment(this.todayDate).format('LLLL');
    dates = dates.filter((date: string) => moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today));
    this._barChartDates = dates;
  }
  public get barChartDates() {
    return this._barChartDates;
  }

  private _barChartData!: ChartDataset[];
  private allData!: ChartDataset[];
  @Input() public set barChartData(data: ChartDataset[]) {
    this.allData = JSON.parse(JSON.stringify(data)) as typeof data;
    // show last month only
    let dates = [...this.allDates];
    const startDayOfLastMonth = moment(this.todayDate).subtract(1, 'month').format('LLLL');
    const today = moment(this.todayDate).format('LLLL');
    let startIndex: number;

    dates.forEach((date: string, index: number) => {
      if (moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today) && !startIndex) {
        startIndex = index;
      }
    });

    data.forEach(p => {
      p.data = p.data.slice(startIndex);
    })
    this._barChartData = data;
  }
  public get barChartData() {
    return this._barChartData;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onPeriodSelected(target: any) {
    const selectedType: string = target.value;
    let dates = [...this.allDates];
    let data = (JSON.parse(JSON.stringify(this.allData)) as typeof this.allData);

    switch (selectedType) {
      case "month": {
        const startDayOfLastMonth = moment(this.todayDate).subtract(1, 'month').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');
        dates = dates.filter((date: string) => {
          return moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today);
        });

        let startIndex: number = -1;
        this.allDates.forEach((date: string, index: number) => {
          if (moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today) && startIndex === -1) {
            startIndex = index;
          }
        });
        data.forEach(p => {
          p.data = p.data.slice(startIndex);
        })

        this._barChartDates = dates;
        this._barChartData = data;
        break;
      }
      case "week": {
        const startDayOfPrevWeek = moment(this.todayDate).subtract(1, 'week').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');
        dates = dates.filter((date: string) => {
          return moment(date, 'DD-MM-YYYY').isBetween(startDayOfPrevWeek, today);
        });

        let startIndex: number = -1;
        this.allDates.forEach((date: string, index: number) => {
          if (moment(date, 'DD-MM-YYYY').isBetween(startDayOfPrevWeek, today) && startIndex === -1) {
            startIndex = index;
          }
        });
        data.forEach(p => {
          p.data = p.data.slice(startIndex);
        })

        this._barChartDates = dates;
        this._barChartData = data;
        break;
      }
      case "year": {
        const startDayOfPrevYear = moment(this.todayDate).subtract(1, 'year').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');

        let startIndex: number = -1;
        this.allDates.forEach((date: string, index: number) => {
          if (moment(date, 'DD/MM/YYYY').isBetween(startDayOfPrevYear, today) && startIndex === -1) {
            startIndex = index;
          }
        });

        data.forEach(p => {
          p.data = p.data.slice(startIndex);
        })

        dates = dates.filter((date: string) => {
          return moment(date, 'DD/MM/YYYY').isBetween(startDayOfPrevYear, today);
        });

        this._barChartDates = dates;
        this._barChartData = data;
        break;
      }
    }
  }

}
