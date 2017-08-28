import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitesJoinPage } from './invites-join';

@NgModule({
  declarations: [
    InvitesJoinPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitesJoinPage),
  ],
  exports: [
    InvitesJoinPage
  ]
})
export class InvitesJoinPageModule {}
