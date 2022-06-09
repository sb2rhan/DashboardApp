import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUser } from '../entities/user';
import { UserType } from '../entities/user-type';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  validateForm!: FormGroup;

  public userTypes = Object.values(UserType)

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private fb: FormBuilder)
  {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userType: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  create() {
    if (this.validateForm.valid) {
      const form = this.validateForm.value;
      this.userService.createUser(form.userType, new RegisterUser(form.username, form.email, form.password))
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
