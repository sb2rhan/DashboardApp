import { formatDate } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataset } from 'chart.js';
import { EditComponent } from '../edit/edit.component';
import { Purchase } from '../entities/purchase';
import { PurchaseService } from '../purchase.service';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { ViewComponent } from '../view/view.component';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  purchases: Purchase[] = [];

  // For report dashboard
  purchaseDates: string[] = [];
  purchaseTotals: ChartDataset[] = [];
  // --------------------

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private purchaseService: PurchaseService, private modalService: NgbModal) {
    this.refreshPurchases();
  }

  refreshPurchases() {
    this.purchaseService.getPurchases()
      .subscribe((res: Purchase[]) => {
        this.purchases = res;
        
        // for report dashboard
        this.purchaseDates = [...new Set(res.map(p => formatDate(p.purchaseDate, 'dd/MM/yyyy', 'en-CA')))];
        
        let purchasesGroupedByDate = res.reduce((r, p) => {
          let purch = Object.assign({}, p)
          purch.purchaseDate = formatDate(purch.purchaseDate, 'dd/MM/yyyy', 'en-CA');
          r[purch.purchaseDate] = r[purch.purchaseDate] || [];
          r[purch.purchaseDate].push(purch);
          return r;
        }, Object.create(null));

        let purchaseCashTotals:number[] = [];
        let purchaseCardTotals:number[] = [];

        this.purchaseDates.forEach(date => {
          let cashPurchases: number[] = purchasesGroupedByDate[date].filter(
            (p: Purchase) => p.purchaseType === "CASH").map((p: Purchase) => p.total);
          let cashTotal = (cashPurchases.length == 0) ? 0 : cashPurchases.reduce((r, p) => r + p);
          let cardPurchases: number[] = purchasesGroupedByDate[date].filter(
            (p: Purchase) => p.purchaseType === "CARD").map((p: Purchase) => p.total);
          let cardTotal = (cardPurchases.length == 0) ? 0 : cardPurchases.reduce((r, p) => r + p);
          
          purchasesGroupedByDate[date] = [cashTotal, cardTotal];
          purchaseCashTotals.push(purchasesGroupedByDate[date][0]);
          purchaseCardTotals.push(purchasesGroupedByDate[date][1]);
        });
        
        this.purchaseTotals = [
          {data: [...purchaseCashTotals], label: 'Cash'}, // cash total
          {data: [...purchaseCardTotals], label: 'Card'}  // card total
        ];

      })
  }

  ngOnInit(): void {
  }

  deletePurchase(id: string) {
    this.purchaseService.deletePurchase(id)
      .subscribe(res => {
        this.purchases = this.purchases.filter(p => p.id !== id);
      })
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this.purchases = [...this.purchases].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  openModal(operation: string, purchase?: Purchase) {
    // if (operation === 'create') {
    //   this.modalService.open(CreateComponent)
    //     .closed
    //     .subscribe(res => {
    //       this.refreshPurchases();
    //     })
    // } else 
    if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.purchase = purchase;
    } else if (operation === 'view') {
      const modalRef = this.modalService.open(ViewComponent);
      modalRef.componentInstance.purchase = purchase;
    }
  }

}
