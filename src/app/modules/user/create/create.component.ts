import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BonusCardService } from '../../bonus-card/bonus-card.service';
import { BonusCard } from '../../bonus-card/entities/bonus-card';
import { User } from '../entities/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;

  bonusCards!: BonusCard[];

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private bonusCardService: BonusCardService,
    private fb: FormBuilder)
  {
    this.bonusCardService
      .getBonusCards().subscribe(
        res => this.bonusCards = res
      );
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      passwordHash: ['', [Validators.required]],
      firstName: ['', [Validators.nullValidator]],
      middleName: ['', [Validators.nullValidator]],
      lastName: ['', [Validators.nullValidator]],
      birthDate: ['', [Validators.nullValidator]],
      email: ['', [Validators.nullValidator]],
      phoneNumber: ['', [Validators.nullValidator]],
      bankCard: ['', [Validators.nullValidator]]
    });
  }

  create() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.userService.createUser(
        new User(form.userName, form.passwordHash, form.email, form.phoneNumber, form.firstName,
          form.middleName, form.lastName, form.birthDate, form.bankCard)
      )
        .subscribe(res => {
          this.activeModal.close('User created');
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
