import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { SortableDirective } from './sortable.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [
    IndexComponent,
    EditComponent,
    CreateComponent,
    SortableDirective
  ],
  exports: [IndexComponent, CreateComponent, EditComponent]
})
export class SupplierModule { }
