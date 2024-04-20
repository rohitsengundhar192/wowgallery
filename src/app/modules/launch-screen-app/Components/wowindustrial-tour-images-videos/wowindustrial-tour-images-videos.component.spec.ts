import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowindustrialTourImagesVideosComponent } from './wowindustrial-tour-images-videos.component';

describe('WowindustrialTourImagesVideosComponent', () => {
  let component: WowindustrialTourImagesVideosComponent;
  let fixture: ComponentFixture<WowindustrialTourImagesVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowindustrialTourImagesVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowindustrialTourImagesVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
