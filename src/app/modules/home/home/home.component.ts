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
        this.purchaseDates = res.map(p => formatDate(p.purchaseDate, 'dd/MM/yyyy', 'en-US'));
        let purchaseCashTotals = res.map(p => (p.purchaseType === "CASH") ? p.total : 0);
        let purchaseCardTotals = res.map(p => (p.purchaseType === "CARD") ? p.total : 0);
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
