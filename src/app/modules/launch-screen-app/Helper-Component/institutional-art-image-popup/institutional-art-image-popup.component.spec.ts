import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalArtImagePopupComponent } from './institutional-art-image-popup.component';

describe('InstitutionalArtImagePopupComponent', () => {
  let component: InstitutionalArtImagePopupComponent;
  let fixture: ComponentFixture<InstitutionalArtImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionalArtImagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionalArtImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
