import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWowindTourComponent } from './edit-wowind-tour.component';

describe('EditWowindTourComponent', () => {
  let component: EditWowindTourComponent;
  let fixture: ComponentFixture<EditWowindTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWowindTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWowindTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
