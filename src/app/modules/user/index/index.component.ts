import { Component, OnInit, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { User } from '../entities/user';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { UserService } from '../user.service';
import { ViewComponent } from '../view/view.component';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DecimalPipe]
})
export class IndexComponent implements OnInit {

  users: User[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  users$!: Observable<User[]>;
  filter = new FormControl('');

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;
        this.users$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text))
        );
      })
  }

  ngOnInit(): void {
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id)
      .subscribe(res => {
        this.users = this.users.filter(p => p.id !== id);
      })
  }

  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction !== '') {
      this.users = [...this.users].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  search(text: string): User[] {
    return this.users.filter(u => {
      const term = text.toLowerCase();
      return u.userName.toLowerCase().includes(term)
          || u.phoneNumber.includes(term)
          || u.email.toLowerCase().includes(term);
    });
  }

  openModal(operation: string, user?: User) {
    if (operation === 'create') {
      this.modalService.open(CreateComponent)
        .closed
        .subscribe(res => {
          this.refreshUsers();
        })
    } else if (operation === 'edit') {
      const modalRef = this.modalService.open(EditComponent);
      modalRef.componentInstance.user = user;
    } else if (operation === 'view') {
      const modalRef = this.modalService.open(ViewComponent);
      modalRef.componentInstance.user = user;
    }
  }

}
