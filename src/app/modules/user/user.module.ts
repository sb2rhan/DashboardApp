import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SortableDirective } from './sortable.directive';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    SortableDirective,
    ViewComponent
  ],
  exports: [IndexComponent, CreateComponent, EditComponent, ViewComponent]
})
export class UserModule { }
