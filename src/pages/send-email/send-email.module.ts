import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEmailPage } from './send-email';

@NgModule({
  declarations: [
    SendEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEmailPage),
  ],
  exports: [
    SendEmailPage
  ]
})
export class SendEmailPageModule {}
