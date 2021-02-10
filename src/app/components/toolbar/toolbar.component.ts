import { AuthService } from 'src/app/services/auth/auth.service';
import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ToolbarService } from '../../shared/services/toolbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterContentChecked {

  toolbarTitle: string | undefined;
  isAuthenticated$ = this.authService.isAuthenticated$();

  constructor(
    private toolbarService: ToolbarService,
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
    ) {
    this.toolbarService.getNavChangeEmitter().subscribe((title: string) => this.toolbarTitle = title);
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  routerUrl(): string {
    return this.router.url;
  }

  logoutClick(): void {
    this.authService.logout().subscribe(loggedOut => {
      this.router.navigate(['/login']);
    });
 }
}
