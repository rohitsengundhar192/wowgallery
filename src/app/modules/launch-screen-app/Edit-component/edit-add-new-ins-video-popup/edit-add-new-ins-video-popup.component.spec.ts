import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddNewInsVideoPopupComponent } from './edit-add-new-ins-video-popup.component';

describe('EditAddNewInsVideoPopupComponent', () => {
  let component: EditAddNewInsVideoPopupComponent;
  let fixture: ComponentFixture<EditAddNewInsVideoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddNewInsVideoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddNewInsVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
