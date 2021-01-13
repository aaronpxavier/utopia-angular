import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ToolbarService} from '../../services/utility/toolbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private toolbarService: ToolbarService) {
    this.toolbarService.emitRouteChangeEvent('Signup');
  }

  ngOnInit(): void {
    console.log('signup');
  }

}
