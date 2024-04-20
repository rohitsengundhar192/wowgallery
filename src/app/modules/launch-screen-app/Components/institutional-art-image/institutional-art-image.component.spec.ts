import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalArtImageComponent } from './institutional-art-image.component';

describe('InstitutionalArtImageComponent', () => {
  let component: InstitutionalArtImageComponent;
  let fixture: ComponentFixture<InstitutionalArtImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionalArtImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionalArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
