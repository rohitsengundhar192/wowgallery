import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowcampImagesVideosPopupComponent } from './wowcamp-images-videos-popup.component';

describe('WowcampImagesVideosPopupComponent', () => {
  let component: WowcampImagesVideosPopupComponent;
  let fixture: ComponentFixture<WowcampImagesVideosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowcampImagesVideosPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowcampImagesVideosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
