import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimVideoPopupComponent } from './trim-video-popup.component';

describe('TrimVideoPopupComponent', () => {
  let component: TrimVideoPopupComponent;
  let fixture: ComponentFixture<TrimVideoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrimVideoPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrimVideoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
