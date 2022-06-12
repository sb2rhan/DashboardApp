import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private purchaseService: PurchaseService, private modalService: NgbModal) {
    this.refreshPurchases();
  }

  refreshPurchases() {
    this.purchaseService.getPurchases()
      .subscribe((res: Purchase[]) => {
        this.purchases = res;
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
