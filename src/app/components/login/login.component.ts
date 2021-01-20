import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToolbarService } from 'src/app/shared/services/toolbar.service';


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
    this.authService.loginUser(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.isPending = false;
      this.showForm = false;
      this.showLoginMsg = true;
      this.loginMsg = 'Welcome: ' + res.firstName + ' ' + res.lastName;
    },
    (err: Error) => {
      this.isPending = false;
      this.showLoginMsg = true;
      this.loginMsg = 'Invalid Email or Password';
    });
  }


}
