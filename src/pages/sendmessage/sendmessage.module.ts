import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendmessagePage } from './sendmessage';

@NgModule({
  declarations: [
    SendmessagePage,
  ],
  imports: [
    IonicPageModule.forChild(SendmessagePage),
  ],
  exports: [
    SendmessagePage
  ]
})
export class SendmessagePageModule {}
