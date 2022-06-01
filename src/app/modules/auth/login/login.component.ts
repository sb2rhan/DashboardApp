import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  validateForm!: FormGroup;

  login() {
    if (this.validateForm.valid) {
      const val = this.validateForm.value;

      if (val.username && val.password) {
        this.authService.login(val.username, val.password)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.authService.setSession(res.token, res.expiration, res.id, res.username);
              this.router.navigateByUrl('/home');
            }
          );
      }
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
