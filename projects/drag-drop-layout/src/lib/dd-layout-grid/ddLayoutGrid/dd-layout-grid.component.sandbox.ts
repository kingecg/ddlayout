import { sandboxOf } from 'angular-playground';
import { DdLayoutGridComponent } from '../dd-layout-grid.component';
import { DdLayoutCellComponent } from '../../dd-layout-cell/dd-layout-cell.component';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';

export default sandboxOf(DdLayoutGridComponent,{
  imports:[
    CommonModule,
    ResizableModule,
    DragDropModule
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
  });
