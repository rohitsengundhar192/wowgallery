
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-audit-trail-dialog',
  templateUrl: './audit-trail-dialog.component.html',
  styleUrls: ['./audit-trail-dialog.component.scss']
})
export class AuditTrailDialogComponent implements OnInit {

  auditTrailData: any;
  constructor(
    public auditTrailDialogRef: MatDialogRef<AuditTrailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.auditTrailData = data;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.auditTrailDialogRef.close(true);
  }
}
