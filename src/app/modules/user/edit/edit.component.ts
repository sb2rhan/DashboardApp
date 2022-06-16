import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../entities/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Input() user!: User;
  validateForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [this.user.userName, [Validators.required]],
      passwordHash: ['', [Validators.nullValidator]],
      firstName: [this.user.firstName, [Validators.nullValidator]],
      middleName: [this.user.middleName, [Validators.nullValidator]],
      lastName: [this.user.lastName, [Validators.nullValidator]],
      birthDate: [this.user.birthDate?.substring(0, 16), [Validators.nullValidator]],
      email: [this.user.email, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.nullValidator]],
      bankCard: [this.user.bankCard, [Validators.nullValidator]]
    });
  }

  edit() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.user.userName = form.userName;
      this.user.passwordHash = form.passwordHash;
      this.user.firstName = form.firstName;
      this.user.middleName = form.middleName;
      this.user.lastName = form.lastName;
      this.user.birthDate = form.birthDate;
      this.user.email = form.email;
      this.user.phoneNumber = form.phoneNumber;
      this.user.bankCard = form.bankCard;

      this.userService.updateUser(this.user.id, this.user)
        .subscribe(res => {
          this.activeModal.close('User edited');
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
