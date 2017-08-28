import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeeinvitedsPage } from './seeinviteds';

@NgModule({
  declarations: [
    SeeinvitedsPage,
  ],
  imports: [
    IonicPageModule.forChild(SeeinvitedsPage),
  ],
  exports: [
    SeeinvitedsPage
  ]
})
export class SeeinvitedsPageModule {}
