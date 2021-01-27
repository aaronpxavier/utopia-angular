import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelerModalComponent } from './edit-traveler-modal.component';

describe('EditTravelerModalComponent', () => {
  let component: EditTravelerModalComponent;
  let fixture: ComponentFixture<EditTravelerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTravelerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
