import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimInsArtImageComponent } from './trim-ins-art-image.component';

describe('TrimInsArtImageComponent', () => {
  let component: TrimInsArtImageComponent;
  let fixture: ComponentFixture<TrimInsArtImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimInsArtImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimInsArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
