import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicationPage } from './publication';

@NgModule({
  declarations: [
    PublicationPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicationPage),
  ],
  exports: [
    PublicationPage
  ]
})
export class PublicationPageModule {}
