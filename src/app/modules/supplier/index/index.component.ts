import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { Supplier } from '../entities/supplier';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { SupplierService } from '../supplier.service';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  suppliers: Supplier[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private supplierService: SupplierService, private modalService: NgbModal) {
    this.refreshSuppliers()
  }

  refreshSuppliers() {
    this.supplierService.getSuppliers()
      .subscribe((res: Supplier[]) => {
        this.suppliers = res;
      })
  }

  ngOnInit(): void {
  }

  deleteSupplier(id: string) {
    this.supplierService.deleteSupplier(id)
      .subscribe(res => {
        this.suppliers = this.suppliers.filter(p => p.id !== id);
      })
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this.suppliers = [...this.suppliers].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  openModal(operation: string, supplier?: Supplier) {
    if (operation === 'create') {
      this.modalService.open(CreateComponent)
        .closed
        .subscribe(res => {
          this.refreshSuppliers();
        })
    } else if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.supplier = supplier;
    }
  }
}
