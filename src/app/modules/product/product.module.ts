import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexComponent } from './index/index.component';
import { SortableDirective } from './sortable.directive';


@NgModule({
  declarations: [
    IndexComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  exports: [IndexComponent]
})
export class ProductModule { }
