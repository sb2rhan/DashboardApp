import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SortableDirective } from './sortable.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    SortableDirective
  ],
  exports: [IndexComponent, CreateComponent, EditComponent]
})
export class CategoryModule { }
