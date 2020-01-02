import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
  host:{
    'class':'card-container'
  }
})
export class CardLayoutComponent implements OnInit {

  constructor() { }
// s
  ngOnInit() {
    //s
    console.log('sss')
  }

}
