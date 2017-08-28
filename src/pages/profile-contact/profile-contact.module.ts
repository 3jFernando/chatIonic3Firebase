import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileContactPage } from './profile-contact';

@NgModule({
  declarations: [
    ProfileContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileContactPage),
  ],
  exports: [
    ProfileContactPage
  ]
})
export class ProfileContactPageModule {}
