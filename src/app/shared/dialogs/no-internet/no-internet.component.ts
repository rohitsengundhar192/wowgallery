import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss']
})
export class NoInternetComponent implements OnInit {

  constructor(public noInternetDialogRef: MatDialogRef<NoInternetComponent>,) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.noInternetDialogRef.close(true);
  }
}
