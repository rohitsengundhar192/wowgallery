import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowindustrialTourIamgesPopupComponent } from './wowindustrial-tour-iamges-popup.component';

describe('WowindustrialTourIamgesPopupComponent', () => {
  let component: WowindustrialTourIamgesPopupComponent;
  let fixture: ComponentFixture<WowindustrialTourIamgesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WowindustrialTourIamgesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowindustrialTourIamgesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
