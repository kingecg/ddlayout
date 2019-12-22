
import { GridLayout, LayoutRect } from './../drag-drop-layout.model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import { CdkDropList, CDK_DROP_LIST_CONTAINER } from '@angular/cdk/drag-drop';

@Component({
  selector: 'ddl-dd-layout-grid',
  templateUrl: './dd-layout-grid.component.html',
  styleUrls: ['./dd-layout-grid.component.scss'],
  providers:[
    // {provide: CDK_DROP_LIST_CONTAINER, useExisting: CdkDropList},
  ]
})
export class DdLayoutGridComponent  implements OnInit {

  @Input() cells:Array<{rect:LayoutRect,label:string}> =[]
  @Input() gutter:number = 8
  @Input() colsPerRow :number = 4
  gridLayout:GridLayout = {}
  inited:boolean = false
  @ViewChild(CdkDropList,{static:true}) droplist:CdkDropList
  constructor(private el:ElementRef) { 
  
  }

  ngOnInit() {
    this.initCalc()
  }

  positionCells(rects:LayoutRect[]){
    let start_x = 0
    let start_y = 0
    let rows = 1
     return rects.map(rectt=>{
      let rect = Object.assign({},rectt)
      if(start_x>=this.colsPerRow || start_x+rect.width>this.colsPerRow){
        start_x = 0
        start_y = start_y + rows
      }
      rect.top = start_y
      rect.left = start_x
     
      console.log('D',rect)
      if(rows<rect.height){
        rows = rect.height
      }
      start_x = start_x + rect.width
      
     return rect
    }) 
    // this.cells = ncells
  }
  initCalc(){
    let rect = (this.el.nativeElement as HTMLElement).getBoundingClientRect()
    this.gridLayout.containerWidth = rect.width
    this.gridLayout.cols = this.colsPerRow | 4
    this.gridLayout.gutter = this.gutter | 8
    this.gridLayout.rowHeight = 100
    this.inited =true
    // this.gridLayout.colWidth = this.gridLayout.colWidth
  }
  onCellSizeChange(rect:LayoutRect, index:number,isResizing = false){
    // this.cells[index].rect = Object.assign(this.cells[index].rect,rect)
    // this.cells.sort((acell,bcell)=>{
    //   if(acell.rect.top != bcell.rect.top){
    //     return acell.rect.top - bcell.rect.top
    //   } else {
    //     return acell.rect.left - bcell.rect.left
    //   }
    // })
    
    let rects = this.cells.map(cell=>cell.rect)
    // if(!isResizing){
        rects[index] = rect
    // }
    rects = this.positionCells(rects)
    this.cells.forEach((cell,i)=>{
      if(i !== index ){
        cell.rect = rects[i]
      } else if(!isResizing){
        cell.rect = rects[i]
      }
    })
  }
}
