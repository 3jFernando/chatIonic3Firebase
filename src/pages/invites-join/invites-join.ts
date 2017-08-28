import { 
	Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	NavParams, 
	AlertController, 
	LoadingController } from 'ionic-angular';
import { 
	Toast } from '@ionic-native/toast'
import { 
	Http, 
	Headers, 
	RequestOptions } from '@angular/http'

import firebase from 'firebase'

//providers data
import {
	InvitedProvider
} from '../../providers/invited/invited'
import {
	NotificationProvider
} from '../../providers/notification/notification'

@IonicPage()
@Component({
  selector: 'page-invites-join',
  templateUrl: 'invites-join.html',
  providers: [
  	Toast,
  	InvitedProvider,
  	NotificationProvider
  ]
})
export class InvitesJoinPage {

	uid:string
	userUsername:string
	userPhotoURL:string

	contactId:string
	contact
	username:string
	photoURL:string

	invitesPlans = new Array

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams, 
  						public alertCtrl: AlertController,
  						public loadingCtrl: LoadingController,
  						public toast: Toast,
  						public http: Http,
  						private invitedProvider: InvitedProvider,
  						private notificationProvider: NotificationProvider) {

  	this.uid = this.navParams.data.uid
  	this.userUsername = this.navParams.data.userUsername
		this.userPhotoURL = this.navParams.data.userPhotoURL

		this.contactId = this.navParams.data.contactId
		this.contact = this.navParams.data.contact
		this.username = this.navParams.data.username
		this.photoURL = this.navParams.data.photoURL

		this.invitesPlans = [
			{
				id: 1,
				name: 'Juguemos football american',
				icon: 'american-football'
			},
			{
				id: 2,
				name: 'Vamos de compras',
				icon: 'briefcase'
			},
			{
				id: 3,
				name: 'Juguemos baloncesto',
				icon: 'baseball'
			},
			{
				id: 4,
				name: 'Vamos a tomar',
				icon: 'beer'
			},
			{
				id: 5,
				name: 'Vamos andar en bicicleta',
				icon: 'bicycle'
			},
			{
				id: 6,
				name: 'Damos una vuelta en mi yate',
				icon: 'boat'
			},
			{
				id: 7,
				name: 'Vamos acampar',
				icon: 'bonfire'
			},
			{
				id: 8,
				name: 'Tomamos una tasa de té',
				icon: 'cafe'
			},
			{
				id: 9,
				name: 'Me llamos por favor',
				icon: 'call'
			},
			{
				id: 10,
				name: 'Unas selfis',
				icon: 'camera'
			},
			{
				id: 11,
				name: 'Veamos television',
				icon: 'desktop'
			},
			{
				id: 12,
				name: 'Vamos al cine',
				icon: 'film'
			},
			{
				id: 13,
				name: 'Jugamos video juegos',
				icon: 'game-controller-b'
			}

		]

  }

  goToInvitesJoin(plan) {
  	this.alertCtrl.create({
  		title: "INVITACION",
  		message: "¿Seguro que deseas enviar la invitacion de: "+ plan.name +" a "+ this.contact.username +" ?",
  		buttons: [
  			{
  				text: 'OTRO DIA'
  			},{
  				text: 'ENVIAR',
  				handler:() => {

  					let loadInvited = this.loadingCtrl.create({
  						content: "Enviando invitacion..."
  					})
  					loadInvited.present()

  					this.invitedProvider.sendInviteJoin(this.contactId, this.uid, plan).then(() => {
  						loadInvited.dismiss()
  						this.toast.show("Invitacion enviada ;)","5000","bottom").subscribe(toast => {})
  					})

  					this.notificationProvider.sendNotification(this.contact.token, this.userUsername, this.userPhotoURL, 'Te envio una invitacion de: '+ plan.name +'')
  				}
  			}
  		]
  	}).present()
  }

  goSeeInvitesJoin() {
  	var user = {
  		username: this.username,
			photoURL: this.photoURL
		}
    this.navCtrl.push("InvitesJoinSeePage", {
      join: this.contactId,
      user: user,
      uid: this.uid
    }, {animate:true})
  }

}
