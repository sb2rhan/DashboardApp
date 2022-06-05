import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { Product } from '../entities/product';
import { ProductService } from '../product.service';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { ViewComponent } from '../view/view.component';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private productService: ProductService, private modalService: NgbModal) {
    if (!this.products.length) {
      this.productService.getProducts()
        .subscribe((res: Product[]) => {
          this.products = res;
        })
    }
  }

  ngOnInit(): void {
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        this.products = this.products.filter(p => p.id !== id);
        console.log('Post deleted successfully');
      })
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction !== '') {
      this.products = [...this.products].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  openModal(operation: string, product?: Product) {
    if (operation === 'create') {
      this.modalService.open(CreateComponent);
    } else if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.product = product;
    } else if (operation === 'view') {
      const modalRef = this.modalService.open(ViewComponent);
      modalRef.componentInstance.product = product;
    }
  }

}
