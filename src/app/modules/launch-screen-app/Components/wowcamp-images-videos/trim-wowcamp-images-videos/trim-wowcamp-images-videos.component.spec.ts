import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimWowcampImagesVideosComponent } from './trim-wowcamp-images-videos.component';

describe('TrimWowcampImagesVideosComponent', () => {
  let component: TrimWowcampImagesVideosComponent;
  let fixture: ComponentFixture<TrimWowcampImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimWowcampImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimWowcampImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
