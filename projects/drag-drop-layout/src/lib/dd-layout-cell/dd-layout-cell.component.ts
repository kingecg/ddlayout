import { LayoutRect, GridLayout } from './../drag-drop-layout.model';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element'
import * as _ from 'lodash'
import { CDK_DROP_LIST_CONTAINER, CdkDropList, CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
@Component({
  selector: 'ddl-dd-layout-cell',
  templateUrl: './dd-layout-cell.component.html',
  styleUrls: ['./dd-layout-cell.component.scss']
})
export class DdLayoutCellComponent implements OnInit, OnChanges,AfterViewInit {
 
  

  disableDrag:boolean = false
  showPlaceHolder:boolean = false
  cellZindex:number = 0
  @Input() edit:boolean
  @Input() gridLayoutRect:LayoutRect = {
    width: 1,
    height: 1
  }
  @Input()
  gridContainer:GridLayout
 
  layout:LayoutRect = {
    width:20,
    height:20
  }
  style:any = {}
  phStyle:any = {}
  @Output() gridLayoutRectChange:EventEmitter<LayoutRect>= new EventEmitter()
  @Output() onResize:EventEmitter<LayoutRect>= new EventEmitter()
  @ViewChild(CdkDrag,{static:true}) drag: CdkDrag
  @ViewChild('cellContainer',{static:true}) cellContainer:ElementRef
  @Input() dropList:CdkDropList
  constructor() { }
  ngAfterViewInit(): void {
    if(this.dropList){
      this.drag._dragRef._withDropContainer(this.dropList._dropListRef)
    }
  }
  ngOnInit() {
    if(this.gridLayoutRect){
     this.layout = this.calcRealRect(this.gridLayoutRect)
      this.updateStyle()
    }
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes.gridLayoutRect && !changes.gridLayoutRect.isFirstChange()){
      this.layout = this.calcRealRect(this.gridLayoutRect)
      this.updateStyle()
    }
    if(changes.dropList && !changes.dropList.isFirstChange()){
      if(this.dropList){
        this.drag._dragRef._withDropContainer(this.dropList._dropListRef)
      }
    }
  }

  calcRealRect(gridLayout:LayoutRect){
    let {top,left,width,height} = gridLayout
    if(this.gridContainer){
      let {containerWidth,gutter,cols,rowHeight} = this.gridContainer
      let colWidth =  (containerWidth - gutter * (cols - 1)) / cols
      width = width * colWidth + gutter*(width-1)
      rowHeight = rowHeight | 100
      height = height*rowHeight + (height - 1) * gutter
      top = top*rowHeight + (top  ) * gutter
      left = left*colWidth + (left ) * gutter
    }
    return {top,left,width,height}
  }
  calcGridRect(rect:LayoutRect){
      if(!this.gridContainer){
        return rect
      } 
      let {containerWidth,gutter,cols,rowHeight} = this.gridContainer
      let colWidth =  (containerWidth - gutter * (cols - 1)) / cols
      let width = Math.floor(rect.width/(colWidth+gutter)) + 1
      let height = Math.floor(rect.height/(rowHeight+gutter)) + 1
      let top =  Math.floor(rect.top/(rowHeight+gutter))
      let left =  Math.floor(rect.left/(colWidth+gutter))
      return {top,left,width,height}
  }
  onResizeStart(event:ResizeEvent){
    this.togglePlaceHolder(true)
    let rect = event.rectangle
    let nt = _.toPairs(rect).map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    this.phStyle = _.fromPairs(nt)
  }
  onResizeEnd(event:ResizeEvent){
    
    let rect = this.calcGridRect(event.rectangle)
    this.gridLayoutRectChange.emit(rect)
    this.disableDrag = false
    this.togglePlaceHolder(false)
    this.cellZindex = 0
  }
  onResizing(event:ResizeEvent){
   console.log(event.rectangle)
    let rect = this.calcRealRect(this.calcGridRect( event.rectangle))
    console.log(rect)
    let nt = _.toPairs(rect).map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    this.phStyle = _.fromPairs(nt)
    this.onResize.emit(this.calcGridRect( event.rectangle))
  }

  updateStyle(numberStyle?:LayoutRect){
    // if(numberStyle)
    this.layout =Object.assign({},this.layout,numberStyle||{})
    let nt = _.toPairs(this.layout).map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
     this.style =_.fromPairs(nt)
    //  this.layoutChange.emit(this.layout)
  }
  validate=(resizeEvent: ResizeEvent)=>{
    if(!this.gridContainer){
      return true
    } else {
     return  resizeEvent.rectangle.left + resizeEvent.rectangle.width < this.gridContainer.containerWidth
    }
    // return true
  }
  onDragStart(){
    this.togglePlaceHolder(true)
    let node:HTMLElement = this.cellContainer.nativeElement
    let rect = node.getBoundingClientRect()
    let {top,left,width,height} = rect
    
    let arrt =_.toPairs({top,left,width,height})
    let nt = arrt.map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    this.phStyle = _.fromPairs(nt)
  }
  onDragMove(event:CdkDragMove){
    let node:HTMLElement = this.cellContainer.nativeElement
    let rect = node.getBoundingClientRect()
    let {top,left,width,height} = rect
    // top += 50*event.delta.y
    // left += 50*event.delta.x
    let nrect ={top,left,width,height} // this.calcRealRect(this.calcGridRect({top,left,width,height}))
    let arrt =_.toPairs(nrect)
    let nt = arrt.map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    console.log(nt)
    this.phStyle = _.fromPairs(nt)
  }
  onDragEnd(event){
    console.log(event)
    this.togglePlaceHolder(false)
    let node:HTMLElement = this.cellContainer.nativeElement
    let rect = node.getBoundingClientRect()
    this.drag.reset()
    let gridRect = this.calcGridRect(rect)
    this.gridLayoutRectChange.emit(gridRect)
  }
  togglePlaceHolder(on:boolean){
    if(on){
      this.showPlaceHolder = true
      this.cellZindex = 99
    } else {
      this.showPlaceHolder = false
      this.cellZindex = 0
    }
  }
}
