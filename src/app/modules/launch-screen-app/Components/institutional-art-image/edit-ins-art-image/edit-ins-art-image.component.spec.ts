import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsArtImageComponent } from './edit-ins-art-image.component';

describe('EditInsArtImageComponent', () => {
  let component: EditInsArtImageComponent;
  let fixture: ComponentFixture<EditInsArtImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsArtImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInsArtImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
