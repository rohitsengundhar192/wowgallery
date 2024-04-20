import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWowindTourComponent } from './add-wowind-tour.component';

describe('AddWowindTourComponent', () => {
  let component: AddWowindTourComponent;
  let fixture: ComponentFixture<AddWowindTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWowindTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWowindTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
