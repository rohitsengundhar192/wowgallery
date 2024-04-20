import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTrailDialogComponent } from './audit-trail-dialog.component';

describe('AuditTrailDialogComponent', () => {
  let component: AuditTrailDialogComponent;
  let fixture: ComponentFixture<AuditTrailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditTrailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditTrailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
