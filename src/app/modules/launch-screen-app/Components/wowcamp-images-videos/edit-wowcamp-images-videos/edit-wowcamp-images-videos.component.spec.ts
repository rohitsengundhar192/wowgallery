import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWowcampImagesVideosComponent } from './edit-wowcamp-images-videos.component';

describe('EditWowcampImagesVideosComponent', () => {
  let component: EditWowcampImagesVideosComponent;
  let fixture: ComponentFixture<EditWowcampImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWowcampImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWowcampImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
