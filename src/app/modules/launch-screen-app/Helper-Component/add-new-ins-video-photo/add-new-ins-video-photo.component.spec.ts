import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInsVideoPhotoComponent } from './add-new-ins-video-photo.component';

describe('AddNewInsVideoPhotoComponent', () => {
  let component: AddNewInsVideoPhotoComponent;
  let fixture: ComponentFixture<AddNewInsVideoPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewInsVideoPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewInsVideoPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
