import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoHomeButtonComponent } from './logo-home-button.component';

describe('LogoHomeButtonComponent', () => {
  let component: LogoHomeButtonComponent;
  let fixture: ComponentFixture<LogoHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoHomeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
