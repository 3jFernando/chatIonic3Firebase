import { 
  Component, 
  NgZone } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  LoadingController, 
  AlertController } from 'ionic-angular'
import { 
  Http, 
  Headers, 
  RequestOptions } from '@angular/http'
import { Toast } from '@ionic-native/toast'
import firebase from 'firebase'
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'

//providers data
import { InvitedProvider } from '../../providers/invited/invited'
import { NotificationProvider } from '../../providers/notification/notification'

@IonicPage()
@Component({
  selector: 'page-addcontact',
  templateUrl: 'addcontact.html',
  providers: [
    AngularFireDatabase, 
    Toast,
    InvitedProvider,
    NotificationProvider
  ]
})
export class AddcontactPage {

  users: FirebaseListObservable<any>
  uid:string

  photoURL:string
  username:string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public angularFire: AngularFireDatabase,
    public zone: NgZone,
    public loading: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    private toast: Toast,
    private invitedProvider: InvitedProvider,
    private notificationProvider: NotificationProvider) {

    this.uid = navParams.data.uid

    this.zone = new NgZone({})
    this.zone.run(() => {
      firebase.database().ref('/users/' + this.uid).on('value', (snap) => {
        if (snap.val() !== null) {

          this.username = snap.val().username
          this.photoURL = snap.val().photoURL
          
        } 
      })
    })

  }

  ionViewDidEnter() {
    this.users = this.angularFire.list('/users')
  }

  addUser(userAdd) {
    this.alertCtrl.create({
      title: "ENVIAR SOLICITUD",
      message: "¿Esta seguro que desea enviarle la solicitud de amista al usuario?",
      buttons: [
        { text: 'CANCELAR', handler: () => { } },
        {
          text: 'ENVIAR',
          handler: () => {
            let load = this.loading.create({
              content: "Por favor espera..."
            });
            load.present()

            this.invitedProvider.sendInvited(this.uid, userAdd.$key).then(() => {
              this.toast.show('Solicitud de amistad enviada!', '5000', 'bottom').subscribe(toast => {})
              this.notificationProvider.sendNotification(userAdd.token, this.username, this.photoURL, 'Te envio una solicitud de amistad!')
            })
           
            load.dismiss()
          }
        }
      ]
    }).present()
  }

}
