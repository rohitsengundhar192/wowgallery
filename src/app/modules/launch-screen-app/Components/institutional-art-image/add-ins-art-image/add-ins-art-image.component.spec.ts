import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsArtImageComponent } from './add-ins-art-image.component';

describe('AddInsArtImageComponent', () => {
  let component: AddInsArtImageComponent;
  let fixture: ComponentFixture<AddInsArtImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsArtImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInsArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
