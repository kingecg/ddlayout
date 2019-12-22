
import { GridLayout } from './../drag-drop-layout.model';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { LayoutRect } from '../drag-drop-layout.model';
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

  positionCells(){
    let start_x = 0
    let start_y = 0
    let rows = 1
     this.cells.map(cell=>{
      let rect = Object.assign({},cell.rect)
      rect.top = start_y
      rect.left = start_x
      if(rows<rect.height){
        rows = rect.height
      }
      start_x = start_x + rect.width
      if(start_x>=this.colsPerRow){
        start_x = 0
        start_y = start_y + rows
      }
      cell.rect = rect
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
  onCellSizeChange(rect:LayoutRect, index:number){
    this.cells[index].rect = Object.assign(this.cells[index],rect)
    this.positionCells()
  }
}
