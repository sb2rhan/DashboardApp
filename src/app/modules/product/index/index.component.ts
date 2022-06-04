import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Product } from '../entities/product';
import { ProductService } from '../product.service';
import { SortableDirective, SortEvent } from '../sortable.directive';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private productService: ProductService) {
    if (!this.products.length) {
      this.productService.getProducts()
        .subscribe(res => {
          this.products = res;
        })
    }
  }

  ngOnInit(): void {
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

}
