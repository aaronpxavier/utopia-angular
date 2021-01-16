import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {ToolbarService} from '../../services/utility/toolbar.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AppComponent } from '../../app.component';
import { passwordMismatch } from '../../utility/validators/passwordMismatch';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
    public fb: FormBuilder) {
    console.log('selected state: ' + this.selected);
  }
  public selectable = true;
  public selected = '';
  public addOnBlur = true;
  public signupForm!: FormGroup;
  public role = 'USER';
  @ViewChild('chipList', { static: true }) chipList: any;
  GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  ngOnInit(): void {
    this.reactiveForm();
    this.toolbarService.emitRouteChangeEvent('Signup');
    console.log(`Spy #${this.signupForm.get('password')} onInit`);
    console.log(this.signupForm);
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
    console.log(this.signupForm.errors);
    console.log(this.signupForm && this.signupForm.value);
  }

}


