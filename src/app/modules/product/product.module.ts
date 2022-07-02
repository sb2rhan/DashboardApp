import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { IndexComponent } from './index/index.component';
import { SortableDirective } from './sortable.directive';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [
    IndexComponent,
    SortableDirective,
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  exports: [IndexComponent, CreateComponent, EditComponent, ViewComponent]
})
export class ProductModule { }
