import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusCardRoutingModule } from './bonus-card-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { SortableDirective } from './sortable.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    BonusCardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateComponent,
    IndexComponent,
    EditComponent,
    SortableDirective
  ],
})
export class BonusCardModule { }
