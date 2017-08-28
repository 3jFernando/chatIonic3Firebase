import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateroutePage } from './createroute';

@NgModule({
  declarations: [
    CreateroutePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateroutePage),
  ],
  exports: [
    CreateroutePage
  ]
})
export class CreateroutePageModule {}
