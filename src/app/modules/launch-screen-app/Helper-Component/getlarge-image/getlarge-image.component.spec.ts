import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlargeImageComponent } from './getlarge-image.component';

describe('GetlargeImageComponent', () => {
  let component: GetlargeImageComponent;
  let fixture: ComponentFixture<GetlargeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetlargeImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetlargeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
