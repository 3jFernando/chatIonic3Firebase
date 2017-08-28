import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule} from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//image viewer
import { IonicImageViewerModule } from 'ionic-img-viewer'

import { CloudSettings, CloudModule } from '@ionic/cloud-angular'

import { AngularFireModule } from 'angularfire2'
import firebase from 'firebase'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactProvider } from '../providers/contact/contact';
import { MessageProvider } from '../providers/message/message';
import { NotificationProvider } from '../providers/notification/notification';
import { InvitedProvider } from '../providers/invited/invited';
import { UserProvider } from '../providers/user/user';
import { PublicationProvider } from '../providers/publication/publication';

const configDbFirebase = {
  apiKey: "AIzaSyCAc9nDGrbvBPr636cBaroNDUSmSQQ1dDY",
  authDomain: "ionic3chatfirebase.firebaseapp.com",
  databaseURL: "https://ionic3chatfirebase.firebaseio.com",
  projectId: "ionic3chatfirebase",
  storageBucket: "ionic3chatfirebase.appspot.com",
  messagingSenderId: "947798741518"
}

firebase.initializeApp(configDbFirebase);

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '15e8e916'
  },
  push: {
    sender_id: '947798741518',
    pluginConfig: {
      ios: {
        badge: true,
        sound: true
      },
      android: {
        iconColor: '#343434',
        forceShow: true
      }
    }
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(configDbFirebase)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireModule,
    ContactProvider,
    MessageProvider,
    NotificationProvider,
    InvitedProvider,
    UserProvider,
    PublicationProvider    
  ]
})
export class AppModule { }
