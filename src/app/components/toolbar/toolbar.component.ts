import { AuthService } from 'src/app/services/auth/auth.service';
import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ToolbarService } from '../../shared/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterContentChecked {

  toolbarTitle: string | undefined;
  constructor(
    private toolbarService: ToolbarService,
    private ref: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.toolbarService.getNavChangeEmitter().subscribe((title: string) => this.toolbarTitle = title);
  }
  isLogin = false;

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  logoutClick(): void {
    localStorage.removeItem('token');
 }

}
