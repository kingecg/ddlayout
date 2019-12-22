import { sandboxOf } from 'angular-playground';
import { DdLayoutCellComponent } from '../dd-layout-cell.component';
import { CommonModule } from '@angular/common';
import { ResizableModule } from 'angular-resizable-element';
import { DragDropModule } from '@angular/cdk/drag-drop';

export default sandboxOf(DdLayoutCellComponent,{
  imports:[
    CommonModule,
    ResizableModule,
    DragDropModule
  ]
})
  .add('default', {
    template: `<ddl-dd-layout-cell [edit]="true" [gridContainer]="grid" [(gridLayoutRect)]="ga">test</ddl-dd-layout-cell>
    <ddl-dd-layout-cell [edit]="true" [gridContainer]="grid" [(gridLayoutRect)]="gb"></ddl-dd-layout-cell>
    `,
    context:{
      grid:{
        cols:4,
        containerWidth:1000,
        gutter: 8,
        rowHeight: 100
      },
      ga:{
        top:0,
        left: 0,
        width:2,
        height:2
      },
      gb:{
        top:0,
        left: 2,
        width:2,
        height:2
      }
    }
  });
