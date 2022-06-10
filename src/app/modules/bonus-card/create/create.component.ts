import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../user/entities/user';
import { UserService } from '../../user/user.service';
import { BonusCardService } from '../bonus-card.service';
import { BonusCard } from '../entities/bonus-card';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  validateForm!: FormGroup;

  users!: User[];

  constructor(public activeModal: NgbActiveModal,
    private bonusCardService: BonusCardService,
    private userService: UserService,
    private fb: FormBuilder) 
  {
    this.userService.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      isActive: ['', [Validators.required]],
      ownerId: ['', [Validators.required]],
    });
  }

  create() {
    if (this.validateForm.valid) {
      this.bonusCardService.createBonusCard(
        new BonusCard(new Date().toISOString(), this.validateForm.value.isActive, this.validateForm.value.ownerId))
      .subscribe(res => {
        this.activeModal.close('Category created');
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
