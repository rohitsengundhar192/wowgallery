import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowscreenDefualtImagesVideosComponent } from './wowscreen-defualt-images-videos.component';

describe('WowscreenDefualtImagesVideosComponent', () => {
  let component: WowscreenDefualtImagesVideosComponent;
  let fixture: ComponentFixture<WowscreenDefualtImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowscreenDefualtImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowscreenDefualtImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
