import { NgModule } from '@angular/core';
import { CgLayoutComponent } from './cg-layout.component';
import { CardLayoutComponent } from './card/card-layout/card-layout.component';
import { CardComponent } from './card/card/card.component';



@NgModule({
  declarations: [CgLayoutComponent, CardLayoutComponent, CardComponent],
  imports: [
  ],
  exports: [CgLayoutComponent]
})
export class CgLayoutModule { }
