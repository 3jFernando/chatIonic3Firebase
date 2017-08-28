import { 
  Component, 
  NgZone } from '@angular/core';
import { 
  IonicPage, 
  NavController } from 'ionic-angular';
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [
    AngularFireDatabase
  ]
})
export class ContactPage {

    zone:NgZone
    photoURL:string = "assets/img/loading.gif"
    email:string
    username:string = "Cargando datos..."
    uid:string

    countInviteds:number
    countContacts:number
    
    contacts: FirebaseListObservable<any>
    users: FirebaseListObservable<any>
    
    constructor(public navCtrl: NavController,
                public angularFire: AngularFireDatabase) {

        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(user => {
            this.zone.run(() => {
                if (user) {

                  firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', (snap) => {
                    if (snap.val() !== null) {

                      this.uid = snap.key

                      this.photoURL = snap.val().photoURL
                      this.username = snap.val().username
                      this.email = snap.val().email

                      this.loadUsers()
                      this.loadContacts()
                      this.loadInviteds()

                    }
                  })

                }
            })
        })

    }

    loadUsers() {
        this.users = this.angularFire.list('/users/')
    }

    loadContacts() {
      this.contacts = this.angularFire.list('/users/'+this.uid+'/contacts/')
      this.angularFire.list('/users/'+this.uid+'/contacts/').forEach(item => {
        this.countContacts = item.length           
      });
    }

    loadInviteds() {
      this.angularFire.list('/users/'+this.uid+'/inviteds/').forEach(item => {
        this.countInviteds = item.length        
      })
    }

    sendMessage(contact) {
      this.navCtrl.push("SendmessagePage", {
        uid: this.uid,
        photoURL: this.photoURL,
        username: this.username,
        contactId: contact.contactId
      }, {animate:false})
    }

    goPerfilContact(contact) {
      this.navCtrl.push("ProfileContactPage", {            
        dataContactId: contact.contactId,
        uid: this.uid
      }, {animate:false})
    }

    addContact() {
      this.navCtrl.push("AddcontactPage", {uid: this.uid}, {animate:false})
    }

    seeInviteds() {
      this.navCtrl.push("SeeinvitedsPage", {uid: this.uid}, {animate:false})
    }

}