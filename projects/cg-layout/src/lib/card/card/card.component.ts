import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host:{
    "class":"card-item"
  }
})
export class CardComponent implements OnInit {

  @Input() @HostBinding('style.flexBasis') width = '25%'
 
  constructor() { }

  ngOnInit() {
  }

}
