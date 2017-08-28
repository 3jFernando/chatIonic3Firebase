import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitesJoinSeePage } from './invites-join-see';

@NgModule({
  declarations: [
    InvitesJoinSeePage,
  ],
  imports: [
    IonicPageModule.forChild(InvitesJoinSeePage),
  ],
  exports: [
    InvitesJoinSeePage
  ]
})
export class InvitesJoinSeePageModule {}
