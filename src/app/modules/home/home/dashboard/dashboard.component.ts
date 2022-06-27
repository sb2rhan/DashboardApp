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
    this.allDates = dates;
    // show last month only
    const startDayOfLastMonth = moment(this.todayDate).subtract(1, 'month').format('LLLL');
    const today = moment(this.todayDate).format('LLLL');
    dates = dates.filter((date: string) => moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today));
    this._barChartDates = dates;
  }
  public get barChartDates() {
    return this._barChartDates;
  }

  @Input() public barChartData!: ChartDataset[];

  constructor() { }

  ngOnInit(): void {
  }

  onPeriodSelected(target: any) {
    const selectedType: string = target.value;
    switch (selectedType) {
      case "month": {
        let dates = [...this.allDates];
        const startDayOfLastMonth = moment(this.todayDate).subtract(1, 'month').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');
        dates = dates.filter((date: string) => {
          return moment(date, 'DD-MM-YYYY').isBetween(startDayOfLastMonth, today);
        });
        this._barChartDates = dates;
        break;
      }
      case "week": {
        let dates = [...this.allDates];
        const startDayOfPrevWeek = moment(this.todayDate).subtract(1, 'week').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');
        dates = dates.filter((date: string) => {
          return moment(date, 'DD-MM-YYYY').isBetween(startDayOfPrevWeek, today);
        });
        this._barChartDates = dates;
        break;
      }
      case "year": {
        let dates = [...this.allDates];
        const startDayOfPrevYear = moment(this.todayDate).subtract(1, 'year').format('LLLL');
        const today = moment(this.todayDate).format('LLLL');
        dates = dates.filter((date: string) => {
          return moment(date, 'DD-MM-YYYY').isBetween(startDayOfPrevYear, today);
        });
        this._barChartDates = dates;
      }
    }
  }

}
