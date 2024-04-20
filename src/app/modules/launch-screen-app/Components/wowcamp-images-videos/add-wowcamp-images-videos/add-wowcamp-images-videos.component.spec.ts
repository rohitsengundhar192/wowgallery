import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWowcampImagesVideosComponent } from './add-wowcamp-images-videos.component';

describe('AddWowcampImagesVideosComponent', () => {
  let component: AddWowcampImagesVideosComponent;
  let fixture: ComponentFixture<AddWowcampImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWowcampImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWowcampImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
