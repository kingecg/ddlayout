import { NgModule } from '@angular/core';
import { DragDropLayoutComponent } from './drag-drop-layout.component';
import { DdLayoutCellComponent } from './dd-layout-cell/dd-layout-cell.component';
import {ResizableModule} from 'angular-resizable-element'
import { CommonModule } from '@angular/common';
import { DdLayoutGridComponent } from './dd-layout-grid/dd-layout-grid.component';
import {DragDropModule} from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [DragDropLayoutComponent, DdLayoutCellComponent, DdLayoutGridComponent],
  imports: [
    CommonModule,
    ResizableModule,
    DragDropModule
  ],
  exports: [DragDropLayoutComponent,DdLayoutCellComponent]
})
export class DragDropLayoutModule { }
