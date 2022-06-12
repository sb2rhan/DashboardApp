import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SortableDirective } from './sortable.directive';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { UserShortPipe } from 'src/app/pipes/user-short.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    SortableDirective,
    ViewComponent,
    EditComponent,
    UserShortPipe
  ],
  exports: [HomeComponent, ViewComponent, EditComponent]
})
export class HomeModule { }
