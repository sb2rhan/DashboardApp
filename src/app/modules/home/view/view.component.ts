import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../user/entities/user';
import { UserService } from '../../user/user.service';
import { Purchase } from '../entities/purchase';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  @Input() purchase!: Purchase;
  user!: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.purchase.cashierId)
      .subscribe(res => this.user = res);
    
  }

}
