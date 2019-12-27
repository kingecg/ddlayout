import { LayoutRect, GridLayout, GRIDCONTAINER } from './../drag-drop-layout.model';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ViewChild, AfterViewInit, ElementRef, OnDestroy, Optional, Inject } from '@angular/core';
import {ResizeEvent} from 'angular-resizable-element'
import * as _ from 'lodash'
import { CDK_DROP_LIST_CONTAINER, CdkDropList, CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Subject, Subscription } from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators'
import { DdLayoutGridComponent } from '../dd-layout-grid/dd-layout-grid.component';
@Component({
  selector: 'ddl-dd-layout-cell',
  templateUrl: './dd-layout-cell.component.html',
  styleUrls: ['./dd-layout-cell.component.scss']
})
export class DdLayoutCellComponent implements OnInit, OnChanges,AfterViewInit,OnDestroy {
  
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
  @Output() dragMoving:EventEmitter<LayoutRect>= new EventEmitter()
  @Output() dragEnd:EventEmitter<LayoutRect>= new EventEmitter()
  @ViewChild(CdkDrag,{static:true}) drag: CdkDrag
  @ViewChild('cellContainer',{static:true}) cellContainer:ElementRef
  @Input() dropList:CdkDropList
  movingSubject:Subject<LayoutRect> = new Subject()
  resizingSubject:Subject<LayoutRect> = new Subject()
  subs:Array<Subscription> = []

  constructor(@Optional() @Inject(GRIDCONTAINER) public parent:DdLayoutGridComponent) { }
  
  ngAfterViewInit(): void {
    if(this.dropList){
      this.drag._dragRef._withDropContainer(this.dropList._dropListRef)
    }
  }
  ngOnDestroy (): void {
    throw new Error("Method not implemented.");
  }
  ngOnInit() {
    if(this.gridLayoutRect){
     this.layout = this.calcRealRect(this.gridLayoutRect)
      this.updateStyle()
    }
    this.subs.push(this.movingSubject.pipe(distinctUntilChanged((p,q)=>{
      return _.isEqual(p,q)
    })).subscribe((rect)=>{
      this.dragMoving.emit(rect)
    }))
    this.subs.push(this.resizingSubject.pipe(distinctUntilChanged((p,q)=>{
      return _.isEqual(p,q)
    })).subscribe((rect)=>{
      this.onResize.emit(rect)
    }))
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
    let scrollTop = this.parent?this.parent.getVerticalScroll():0
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
      let width = Math.floor(Math.round(rect.width)/(colWidth+gutter)) + 1
      let height = Math.floor(Math.round(rect.height)/(rowHeight+gutter)) + 1
      let top =  Math.floor(Math.round(rect.top+gutter)/(rowHeight+gutter))
      // console.log('Calc:',rect.top,rowHeight+gutter,top)
      let left =  Math.floor(Math.round(rect.left+gutter)/(colWidth+gutter))
      if(left<0){
        left = 0
      }
      if(top <0){
        top =0
      }
      return {top,left,width,height}
  }
  onResizeStart(event:ResizeEvent){
    this.togglePlaceHolder(true)
    let rect = event.rectangle 
    // let scrollTop = this.parent?this.parent.getVerticalScroll():0
    //  rect.top +=scrollTop
    let nt = _.toPairs(rect).map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    this.phStyle = _.fromPairs(nt)
  }
  onResizeEnd(event:ResizeEvent){
    let nrect = event.rectangle 
    // let scrollTop = this.parent?this.parent.getVerticalScroll():0
    //  nrect.top +=scrollTop
    nrect.top = this.layout.top
    let rect = this.calcGridRect(nrect)
    this.gridLayoutRectChange.emit(rect)
    this.disableDrag = false
    this.togglePlaceHolder(false)
    this.cellZindex = 0
  }
  onResizing(event:ResizeEvent){
    let nrect = event.rectangle 
    // let scrollTop = this.parent?this.parent.getVerticalScroll():0
     nrect.top = this.layout.top
    let grect = this.calcGridRect( nrect)
    // console.log(grect)
    let rect = this.calcRealRect(grect)
    // console.log(rect)
    let nt = _.toPairs(rect).map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    this.phStyle = _.fromPairs(nt)
    this.resizingSubject.next(grect)
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
     return  resizeEvent.rectangle.left + resizeEvent.rectangle.width <= this.gridContainer.containerWidth
    }
    // return true
  }
  onDragStart(){
    this.togglePlaceHolder(true)
    let node:HTMLElement = this.cellContainer.nativeElement
    let rect = node.getBoundingClientRect()
    let {top,left,width,height} = rect
    let nrect ={top,left,width,height}
    let scrollTop = this.parent?this.parent.getVerticalScroll():0
    nrect.top +=scrollTop
    let arrt =_.toPairs(nrect)
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
    // let nrect = event.rectangle 
    let scrollTop = this.parent?this.parent.getVerticalScroll():0
     nrect.top +=scrollTop
    let arrt =_.toPairs(nrect)
    let nt = arrt.map(paire=>{
      let p = []
      p.push(paire[0])
      p.push(`${paire[1]}px`)
      return p
    })
    console.log(nt)
    this.phStyle = _.fromPairs(nt)
    let ngRect = this.calcGridRect(nrect)
   
      this.movingSubject.next(ngRect)
    
    
  }
  onDragEnd(event){
    console.log(event)
    this.togglePlaceHolder(false)
    let node:HTMLElement = this.cellContainer.nativeElement
    let rect = node.getBoundingClientRect()
    let {top,left,width,height} = rect
    let nrect = {top,left,width,height}
    let scrollTop = this.parent?this.parent.getVerticalScroll():0
    nrect.top +=scrollTop
    this.drag.reset()
    let gridRect = this.calcGridRect(nrect)
    this.dragEnd.emit(gridRect)
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
