import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutimagePage } from './logoutimage';

@NgModule({
  declarations: [
    LogoutimagePage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutimagePage),
  ],
  exports: [
    LogoutimagePage
  ]
})
export class LogoutimagePageModule {}
