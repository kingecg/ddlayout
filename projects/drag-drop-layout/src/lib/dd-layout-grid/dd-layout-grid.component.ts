
import { GridLayout, LayoutRect, GRIDCONTAINER } from './../drag-drop-layout.model';
import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { CdkDropList, CDK_DROP_LIST_CONTAINER } from '@angular/cdk/drag-drop';
import {pullAt} from 'lodash'
@Component({
  selector: 'ddl-dd-layout-grid',
  templateUrl: './dd-layout-grid.component.html',
  styleUrls: ['./dd-layout-grid.component.scss'],
  providers:[
     {provide: GRIDCONTAINER,useExisting:DdLayoutGridComponent},
  ]
})
export class DdLayoutGridComponent  implements OnInit,OnChanges {
  

  @Input() cells:Array<{rect:LayoutRect,label:string,[k:string]:any}> =[]
  @Input() cellsChange:EventEmitter<Array<{rect:LayoutRect,label:string,[k:string]:any}>> = new EventEmitter()
  @Input() gutter:number = 8
  @Input() colsPerRow :number = 4
  @Input() cellTemplate:TemplateRef<void>
  gridLayout:GridLayout = {}
  inited:boolean = false
  @ViewChild(CdkDropList,{static:true}) droplist:CdkDropList
  constructor(private el:ElementRef) { 
  
  }

  ngOnInit() {
    this.initCalc()
    this.updateCell()
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes.cells&&!changes.cells.isFirstChange()){
      this.updateCell()
    }
  }

  getVerticalScroll(){
    let node:HTMLElement = this.el.nativeElement
    return node.scrollTop
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
  
    this.arrangeCells(rect,index)
    if(!isResizing){
      this.cells[index].rect = rect
      this.cellsChange.emit(this.cells)
    }
  }
  arrangeCells(placeHolderRect:LayoutRect,index:number){
    console.log('Detect:',placeHolderRect,index)
    let nrects = this.cells.map(cell=>cell.rect)
    pullAt(nrects,index)
    if(!this.isOverlap(nrects,placeHolderRect)){
      return
    }
    let holders = [placeHolderRect]
    let newPosition = []
    this.cells.forEach((cell,i)=>{
        if(index!=i){
          if(!this.isOverlap(holders,cell.rect)){
            holders.push(cell.rect)
            return
          }
          let t = 0
          let rect = null
          while(!rect){
            for(let l = 0 ; l< this.colsPerRow;l++){
              let r = {top:t,left:l,width:cell.rect.width,height:cell.rect.height}
              if(!this.isOverlap(holders,r)){
                rect = r
                break;
              }
            }
            t+=1
          }
          if(rect){
            // cell.rect = rect
            newPosition.push({index:i,rect})
            holders.push(rect)
            return
          }          
        }
    })
    if(newPosition.length){
      newPosition.forEach(np=>{
        this.cells[np.index].rect = np.rect
      })
    }
  }
  isOverlap(rects:LayoutRect[],rect:LayoutRect){
    for(let i = 0 ;i<rects.length;i++){
      let ir = rects[i]
      let {left, top, width,height} = ir
      if(!(rect.left>=left+width || rect.left+rect.width<=left || rect.top>= top+height || rect.top+rect.height<=top)||rect.width+rect.left>this.colsPerRow){
        // console.log('Overlap:',rects,rect,true)
        return true
      }
    }
    // console.log('Overlap:',rects,rect,false)
    return false
  }
  addCell(nrect:LayoutRect){
    let holders = this.cells.map(cell=>cell.rect)
    let t = 0
    let rect = null
    while(!rect){
      for(let l = 0 ; l< this.colsPerRow;l++){
        let r = {top:t,left:l,width:nrect.width,height:nrect.height}
        if(!this.isOverlap(holders,r)){
          rect = r
          break;
        }
      }
      t+=1
    }
    return rect
  }
  updateCell(){
    let unPositioned = []
    let positioned = []
    this.cells.forEach(cell=>{
      if(!cell.rect || cell.rect.top === undefined || cell.rect.left === undefined){
        unPositioned.push(cell)
      } else {
        positioned.push(cell)
      }
    })
    if(unPositioned.length > 0){
      this.cells = positioned
      unPositioned.forEach(cell=>{
        let nrect = {
          width: cell.rect?cell.rect.width||1:1,
          height: cell.rect?cell.rect.height||1:1
        }
        let frect = this.addCell(nrect)
        cell.rect = frect
        this.cells.push(cell)
      })
    }
  }
  onDragMoving(rect:LayoutRect,index:number){
    this.arrangeCells(rect,index)
  }
  onDragEnd(rect:LayoutRect,index:number){
    this.arrangeCells(rect,index)
    this.cells[index].rect = rect
    this.cellsChange.emit(this.cells)
  }
}
