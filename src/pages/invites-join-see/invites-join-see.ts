import { 
  Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  LoadingController } from 'ionic-angular';
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

//providers data
import {
  InvitedProvider
} from '../../providers/invited/invited'

@IonicPage()
@Component({
  selector: 'page-invites-join-see',
  templateUrl: 'invites-join-see.html',
  providers: [
    AngularFireDatabase,
    InvitedProvider
  ]
})
export class InvitesJoinSeePage {

	uid:string
	join
	user

	invitesjoin: FirebaseListObservable<any>
  invitesjoinContat: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						public angularFire: AngularFireDatabase,
              public alertCtrl: AlertController, 
              public loadginCtrl: LoadingController,
              private invitedProvider: InvitedProvider) {

  	this.uid = this.navParams.data.uid
  	this.join = this.navParams.data.join
		this.user = this.navParams.data.user

		this.loadInvitesJoin(this.join, this.user)

  }

  loadInvitesJoin(join, user) {
  	this.invitesjoin = this.angularFire.list('/users/'+this.uid+'/invitesJoinsPlan/recived/'+this.join)
    this.invitesjoinContat = this.angularFire.list('/users/'+this.join+'/invitesJoinsPlan/recived/'+this.uid)
  }

  btnGoUpdateStateInvitedJoin(invited) {
    this.invitedProvider.updateStateInvitedJoin(this.uid, this.join, invited).then(() => {})
  }

  goToDeleteInvitedJoin(key) {
    this.alertCtrl.create({
      title: 'ELIMINAR',
      message: '¿Seguro que deseas eliminar la invitacion, si la eliminas tu contacto dejara de verla?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'SI',
          handler: () => {
            let loadRemoving = this.loadginCtrl.create({
              content: "Eliminando..."
            })
            loadRemoving.present()
            this.invitedProvider.deleteInvitedJoin(this.join, this.uid, key)
            loadRemoving.dismiss()
          }
        }
      ]
    }).present()
  }

}
