import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportSearchModalComponent } from './airport-search-modal.component';

describe('AirportSearchModalComponent', () => {
  let component: AirportSearchModalComponent;
  let fixture: ComponentFixture<AirportSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportSearchModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
