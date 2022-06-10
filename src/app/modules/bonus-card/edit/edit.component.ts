import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../user/entities/user';
import { UserService } from '../../user/user.service';
import { BonusCardService } from '../bonus-card.service';
import { BonusCard } from '../entities/bonus-card';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() bonusCard!: BonusCard;
  validateForm!: FormGroup;

  users!: User[];

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private bonusCardService: BonusCardService,
    private fb: FormBuilder) 
  {
    this.userService.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      isActive: [this.bonusCard.isActive, [Validators.required]],
      ownerId: [this.bonusCard.ownerId, [Validators.required]],
    });
  }

  edit() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.bonusCard.isActive = form.isActive;
      this.bonusCard.ownerId = form.ownerId;
      
      this.bonusCardService.updateBonusCard(this.bonusCard.id, this.bonusCard)
        .subscribe(res => {
          this.activeModal.close('Bonus Card edited');
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
