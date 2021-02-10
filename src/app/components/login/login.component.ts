import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';
import { Users } from './types';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isPending = false;
  public showForm = true;
  public loginMsg = '';
  public showLoginMsg = false;
  private readonly token: string;

  constructor(private toolbarService: ToolbarService,
              private authService: AuthService,
              public router: Router,
              public fb: FormBuilder) {
    }

  ngOnInit(): void {
    this.reactiveForm();
    this.toolbarService.emitRouteChangeEvent('Login');
    if (this.token) {
      this.showForm = false;
    }
  }

  /* Reactive form */
  reactiveForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submitForm(): void {
    this.isPending = true;
    this.authService.loginUser(this.loginForm.value).subscribe((user: Users) => {
      this.isPending = false;
      this.showForm = false;
      this.showLoginMsg = true;
      this.router.navigate(['booking/flight']);
    },
    (err: Error) => {
      this.isPending = false;
      this.showLoginMsg = true;
      this.loginMsg = 'Invalid Email or Password';
    });
  }


}
