import { sandboxOf } from 'angular-playground';
import { DdLayoutGridComponent } from '../dd-layout-grid.component';
import { DdLayoutCellComponent } from '../../dd-layout-cell/dd-layout-cell.component';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms'
export default sandboxOf(DdLayoutGridComponent,{
  imports:[
    CommonModule,
    ResizableModule,
    DragDropModule,
    FormsModule
  ],
  declarations:[
    DdLayoutCellComponent,
    DdLayoutGridComponent
  ]
})
  .add('default', {
    template: `<ddl-dd-layout-grid style="display:block;width:1000px;height:1000px;overflow:hidden" [cells]="cells"></ddl-dd-layout-grid>`,
    context:{
      cells:[
        {rect:{top:0,left:0,width:1,height:1},label:'a'},
        {rect:{top:0,left:1,width:1,height:1},label:'b'},
        {rect:{top:0,left:2,width:1,height:1},label:'c'},
        {rect:{top:0,left:3,width:1,height:1},label:'d'},
      ]
    }
  }).add('add cell', {
    template: `
    <div>
    宽度：<input type="number" [(ngModel)]="width">高度：<input type="number" [(ngModel)]="height"><button (click)="add()">add</button>
    </div>
    <ddl-dd-layout-grid style="display:block;width:1000px;height:1000px;overflow:hidden;position:relative" [(cells)]="cells"></ddl-dd-layout-grid>`,
    context:{
      height:1,
      width:1,
      cells:[
        {rect:{top:0,left:0,width:1,height:1},label:'a'},
        {rect:{top:0,left:1,width:1,height:1},label:'b'},
        {rect:{top:0,left:2,width:1,height:1},label:'c'},
        {rect:{top:0,left:3,width:1,height:1},label:'d'},
      ],
      add:function(){
        this.cells = [].concat(this.cells,[{rect:{width:this.width,height:this.height},label:`add_${Date.now()}`}])
      }
    }
  });
