import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../entities/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  @Input() user!: User;

  fullName: string = "none";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    let name = [this.user.firstName, this.user.middleName, this.user.lastName].join(' ');
    if (name.trim().length) {
      this.fullName = name;
    }
  }

}
