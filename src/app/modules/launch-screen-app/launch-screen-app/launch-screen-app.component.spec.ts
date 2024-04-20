import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchScreenAppComponent } from './launch-screen-app.component';

describe('LaunchScreenAppComponent', () => {
  let component: LaunchScreenAppComponent;
  let fixture: ComponentFixture<LaunchScreenAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchScreenAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchScreenAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
