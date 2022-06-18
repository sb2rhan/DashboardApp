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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
              if (res.roles.find((r: string) => r == "Administrator")) {
                this.authService.setSession(res.token, res.expiration, res.id, res.username);
                this.router.navigateByUrl('/home');
              } else {
                alert('This user does not have an Admin role');
              }
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
