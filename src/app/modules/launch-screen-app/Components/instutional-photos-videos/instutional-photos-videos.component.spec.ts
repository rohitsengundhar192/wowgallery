import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstutionalPhotosVideosComponent } from './instutional-photos-videos.component';

describe('InstutionalPhotosVideosComponent', () => {
  let component: InstutionalPhotosVideosComponent;
  let fixture: ComponentFixture<InstutionalPhotosVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstutionalPhotosVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstutionalPhotosVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
