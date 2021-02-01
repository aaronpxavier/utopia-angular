import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredLoadingSpinnerComponent } from './centered-loading-spinner.component';

describe('CenteredLoadingSpinnerComponent', () => {
  let component: CenteredLoadingSpinnerComponent;
  let fixture: ComponentFixture<CenteredLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenteredLoadingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteredLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
