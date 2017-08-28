import { 
    Component, 
    NgZone } from '@angular/core';
import { 
    IonicPage, 
    NavController, 
    NavParams, 
    LoadingController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    zone: NgZone
    txt_password:string = ""
    txt_email:string = ""

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loading: LoadingController,
        ) {

    }

    ionViewDidLoad() {
        const load = this.loading.create({
            content: "Opteniendo ulima sesion..."
        })
        load.present()

        this.zone = new NgZone({})
        firebase.auth().onAuthStateChanged(user => {
            this.zone.run(() => {
                if (user) {
                    load.dismiss()
                    this.navCtrl.setRoot("TabsPage", {}, { animate: false })
                } else {
                    load.dismiss()
                }
            })
        })
    }

    loginSimple() {
      const load = this.loading.create({
          content: "INICIANDO SESION..."
      });
      load.present();

      firebase.auth().signInWithEmailAndPassword(this.txt_email, this.txt_password)
        .then(() => {

          load.dismiss()
          this.navCtrl.setRoot("TabsPage", {}, { animate: false })

        }).catch((err) => {
            load.dismiss()
            alert("Falla :/... firebase" + err)
        })
    }

    login() {
        
        
    }

    logout() {
        this.navCtrl.push("LogoutPage", {}, { animate: false })
    }

}
