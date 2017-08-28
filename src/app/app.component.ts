import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Push, PushToken } from '@ionic/cloud-angular'
import firebase from 'firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:string = "WelcomePage"
  zone: NgZone

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()

      this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(user => {
            this.zone.run(() => {
                if (user !== null) {

                  this.registerToken(JSON.stringify(user.uid))

                } else {
                    
                }
            });
        });


    })
  }

  registerToken(uid) {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t, {
        ignore_user: true
      }) 
    }).then((t: PushToken) => {
      console.log("token: " + t.token)
      firebase.database().ref('/users/' + uid).update({
        token: t.token
      })              
    }).catch(err => {
      console.log("No se pudo obtener el token")
    })
  }

}
