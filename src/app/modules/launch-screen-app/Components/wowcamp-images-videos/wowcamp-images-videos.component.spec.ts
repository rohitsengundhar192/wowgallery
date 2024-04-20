import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowcampImagesVideosComponent } from './wowcamp-images-videos.component';

describe('WowcampImagesVideosComponent', () => {
  let component: WowcampImagesVideosComponent;
  let fixture: ComponentFixture<WowcampImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowcampImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowcampImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
