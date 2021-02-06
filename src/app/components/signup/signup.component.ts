import {Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../shared/services/toolbar.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { passwordMismatch } from '../../utility/validators/passwordMismatch';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public selectable = true;
  public addOnBlur = true;
  public signupForm!: FormGroup;
  public role = 'USER';
  public isPending = false;
  public isError = false;
  public showForm = true;
  public confirmationMsg = '';
  public showConfirmationMsg = false;
  private readonly token: string;

  constructor(
    private toolbarService: ToolbarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public fb: FormBuilder) {
      this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit(): void {
    this.reactiveForm();
    this.toolbarService.emitRouteChangeEvent('Signup');
    if (this.token) {
      this.showForm = false;
      this.submitUserConfirmation();
    }
  }


  /* Reactive form */
  reactiveForm(): void {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: this.role,
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, {
      validators: passwordMismatch
    });
  }

  submitForm(): void {
    this.isPending = true;
    console.log(this.signupForm.errors);
    this.authService.postUser(this.signupForm.value).subscribe((res: any) => {
      this.isPending = false;
      this.showForm = false;
      this.showConfirmationMsg = true;
      this.confirmationMsg = 'Account created click on link in email sent to: ' + this.signupForm.value.email + ' to activate account.';
    },
      (err: Error) => {
        this.signupForm.get('email').setErrors({ taken: 'Email already taken.' });
        this.isPending = false;
    });
  }


  submitUserConfirmation(): void {
    this.isPending = true;
    this.showConfirmationMsg = true;
    this.confirmationMsg = 'Confirming your account...';
    if (!this.token) {
      throw new Error('Token must be set before confirming user');
    }
    this.authService.confirmUser(this.token).subscribe((res: any) => {
      this.confirmationMsg = 'Your account has been successfully confirmed!';
      this.isPending = false;
    },
    (err: Error) => {
      this.isPending = false;
      this.confirmationMsg = 'User not confirmed invalid token';
      console.error(err);
    });
  }

}


