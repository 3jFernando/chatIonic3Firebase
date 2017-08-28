import { 
  Component, 
  NgZone } from '@angular/core'
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  LoadingController } from 'ionic-angular'
import { 
  Http, 
  Headers, 
  RequestOptions } from '@angular/http'
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

//providers data
import { 
  InvitedProvider } from '../../providers/invited/invited'

@IonicPage()
@Component({
  selector: 'page-seeinviteds',
  templateUrl: 'seeinviteds.html',
  providers: [
    AngularFireDatabase,
    InvitedProvider
  ]
})
export class SeeinvitedsPage {

  uid:string
  
  tokenContact:string
  usernameUser:string
  photoURLUser:string
  
  users: FirebaseListObservable<any>
  inviteds: FirebaseListObservable<any>
   
  invitedsJoins = new Array
  invitedsJoinsUsers = new Array

  constructor(public navCtrl: NavController, 
                     public navParams: NavParams, 
                     public zone: NgZone,
                     public http: Http,
                     public angularFire: AngularFireDatabase,
                     public alertCtrl: AlertController, 
                     public loadCtrl: LoadingController,
                     private invitedProvider:InvitedProvider) {

    this.invitedsJoins = []
    this.invitedsJoinsUsers = []

     this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(user => {
            this.zone.run(() => {
                if (user) {

                    var user_data = firebase.database().ref('/users/' + JSON.stringify(user.uid));
                    user_data.on('value', (snap) => {
                        if (snap.val() !== null) {

                            this.uid = snap.key

                            this.loadUsers()
                            this.loadInviteds()
                            this.loadInvitesJoin()

                        }
                    })

                } 
            })
        })

  }

    loadUsers() {
      this.users = this.angularFire.list('/users/')
    }

    loadInviteds() {
      this.inviteds = this.angularFire.list('/users/'+this.uid+'/inviteds/')
    }

    loadInvitesJoin() {
      this.invitedsJoinsUsers = []
      this.invitedsJoins = []
      this.angularFire.list('/users/').forEach(user => {
        for(var i = 0; i < user.length; i++) {
          this.invitedsJoinsUsers.push(user[i])
        }
      })
      this.angularFire.list('/users/'+this.uid+'/invitesJoinsPlan/recived').forEach(invited => {
        for(var i = 0; i < invited.length; i++) {
          this.invitedsJoins.push(invited[i])
        }
      })
    }

    invitedClick(invitedContactId, userKey, name) {

      firebase.database().ref('/users/'+userKey).once('value', contact => {
         this.tokenContact = contact.val().token
      })

      firebase.database().ref('/users/'+this.uid).once('value', user => {         
         this.usernameUser = user.val().username
         this.photoURLUser = user.val().photoURL
      })

      this.alertCtrl.create({
        title: "ACEPTAR INVITACION!",
        message: "¿Esta seguro que deseas aceptar la solucitud de amistad de "+name+"?",
        buttons: [
          {
            text: 'ELIMINAR', 
            handler: () => {
              this.invitedProvider.deleteInvited(this.uid, userKey)
            }
          },
          {
            text: 'ACEPTAR', 
            handler: () => {
              this.invitedProvider.aceptedinvited(this.uid, userKey)
            }
          }
        ]
      }).present();
    }

    goToHelp() {
      this.alertCtrl.create({
        title: "ACEPTAR INVITACION!",
        message: `<i>Aqui, aparecen todas las notificaciones 
        que te hayan enviado los usuarios! puedes tanto
        aceptarlas como eliminarlas<i>`,
        buttons: [{text: 'ENTIENDO'}]
      }).present()
    }

    goSeeInvitesJoin(join, user) {
      this.navCtrl.push("InvitesJoinSeePage", {
        join: join.$key,
        user: user,
        uid: this.uid
      }, {animate:true})
    }

}
