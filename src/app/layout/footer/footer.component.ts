import { Component, OnInit } from '@angular/core';
// import * as moment from 'moment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  current_year:any; 

  constructor() { 
    // this.current_year = moment().year();
  }

  ngOnInit(): void {

  }



}
