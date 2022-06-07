import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { User } from '../entities/user';
import { SortableDirective, SortEvent } from '../sortable.directive';
import { UserService } from '../user.service';
import { ViewComponent } from '../view/view.component';

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  users: User[] = [];

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getUsers()
      .subscribe((res: User[]) => {
        this.users = res;
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
