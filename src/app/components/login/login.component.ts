import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import { ToolbarService } from 'src/app/services/utility/toolbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
  
export class LoginComponent implements OnInit {

  public selectable = true;
  public addOnBlur = true;
  public loginForm!: FormGroup;
  public isPending = false;
  public isError = false;
  public showForm = true;
  public loginMsg = '';
  public showLoginMsg = false;
  private readonly token: string;

  constructor(private toolbarService: ToolbarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public fb: FormBuilder) {
      this.token = this.route.snapshot.paramMap.get('token');
    }

  ngOnInit(): void {
    this.reactiveForm();
    this.toolbarService.emitRouteChangeEvent('Login');
    if (this.token) {
      this.showForm = false;
      this.submitUserLogin;
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
    console.log(this.loginForm.errors);
    console.log(this.loginForm && this.loginForm.value);
    this.authService.postUser(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      this.isPending = false;
      this.showForm = false;
      this.showLoginMsg = true;
      this.loginMsg = 'Welcome: ' + this.loginForm.value.firstName + " " + this.loginForm.value.lastName;
    },
    (err: Error) => {
      this.isPending = false;
    });
  }

  submitUserLogin(): void {
    this.isPending = true;
    this.showLoginMsg = true;
    this.loginMsg = 'Confirming your account...';
    console.log(this.token);
    if (!this.token) {
      throw new Error('Token must be set before confirming user');
    }
    this.authService.confirmUser(this.token).subscribe((res: any) => {
      console.log(res);
      this.loginMsg = 'Your account has been successfully confirmed!';
      this.isPending = false;
    },
    (err: Error) => {
      this.isPending = false;
      this.loginMsg = 'Invalid user or password!';
      console.error(err);
    });
  }
}