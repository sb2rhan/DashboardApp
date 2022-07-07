import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { Product } from '../entities/product';
import { ProductService } from '../product.service';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { ViewComponent } from '../view/view.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DecimalPipe]
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  products$!: Observable<Product[]>;
  filter = new FormControl('');

  constructor(private productService: ProductService, private modalService: NgbModal, private pipe: DecimalPipe) {
    this.refreshProducts();
  }

  refreshProducts() {
    this.productService.getProducts()
      .subscribe((res: Product[]) => {
        this.products = res;
        this.products$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, this.pipe))
        );
      })
  }

  ngOnInit(): void {
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        this.products = this.products.filter(p => p.id !== id);
      })
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this.products = [...this.products].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search(text: string, pipe: PipeTransform): Product[] {
    return this.products.filter(p => {
      const term = text.toLowerCase();
      return p.name.toLowerCase().includes(term)
          || pipe.transform(p.barcode).includes(term)
          || p.description.toLowerCase().includes(term);
    });
  }

  openModal(operation: string, product?: Product) {
    if (operation === 'create') {
      this.modalService.open(CreateComponent)
        .closed
        .subscribe(res => {
          this.refreshProducts();
        })
    } else if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.product = product;
    } else if (operation === 'view') {
      const modalRef = this.modalService.open(ViewComponent);
      modalRef.componentInstance.product = product;
    }
  }

}
