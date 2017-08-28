var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//image viewer
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { CloudModule } from '@ionic/cloud-angular';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContactProvider } from '../providers/contact/contact';
import { MessageProvider } from '../providers/message/message';
import { NotificationProvider } from '../providers/notification/notification';
import { InvitedProvider } from '../providers/invited/invited';
import { UserProvider } from '../providers/user/user';
import { PublicationProvider } from '../providers/publication/publication';
var configDbFirebase = {
    apiKey: "AIzaSyCAc9nDGrbvBPr636cBaroNDUSmSQQ1dDY",
    authDomain: "ionic3chatfirebase.firebaseapp.com",
    databaseURL: "https://ionic3chatfirebase.firebaseio.com",
    projectId: "ionic3chatfirebase",
    storageBucket: "ionic3chatfirebase.appspot.com",
    messagingSenderId: "947798741518"
};
firebase.initializeApp(configDbFirebase);
var cloudSettings = {
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
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map