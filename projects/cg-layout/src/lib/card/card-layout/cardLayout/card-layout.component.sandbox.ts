import { sandboxOf } from 'angular-playground';
import { CardLayoutComponent } from '../card-layout.component';
import {CardComponent} from '../../card/card.component'
export default sandboxOf(CardLayoutComponent,{
  declarations:[CardLayoutComponent,CardComponent]
})
  .add('default', {
    template: `<lib-card-layout style="line-height:2em;height:600px;overflow-y:scroll">
    <lib-card width="30%">
    <div style="background-color:rgba(0,0,0,.3);border-radius:2px;height:80px;width:100%"></div>
    </lib-card>
    <lib-card width="30%"><div style="background-color:rgba(0,0,0,.3);border-radius:2px;height:80px;width:100%"></div></lib-card>
    <lib-card>sss</lib-card>
    <lib-card>sss</lib-card>
    <lib-card>sss</lib-card>
    <lib-card>ssessdss</lib-card>
    <lib-card>This is for test timeouste</lib-card>
    <lib-card width="30%">
    <div style="background-color:rgba(0,0,0,.3);border-radius:2px;height:80px;width:100%"></div>
    </lib-card>
    <lib-card width="30%"><div style="background-color:rgba(0,0,0,.3);border-radius:2px;height:80px;width:100%"></div></lib-card>
    <lib-card>sss</lib-card>
    <lib-card>sss</lib-card>
    <lib-card>sss</lib-card>
    <lib-card>ssessdss</lib-card>
    <lib-card>This is for test timeouste</lib-card>
    </lib-card-layout>`
  });
