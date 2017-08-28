import { 
  Component } from '@angular/core'
import { 
  IonicPage, 
  NavController, 
  NavParams } from 'ionic-angular'
import { 
  Toast } from '@ionic-native/toast'
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

//providers data
import {
  PublicationProvider
} from '../../providers/publication/publication'

@IonicPage()
@Component({
  selector: 'page-profile-contact',
  templateUrl: 'profile-contact.html',
  providers: [
    AngularFireDatabase, 
    Toast,
    PublicationProvider
  ]
})
export class ProfileContactPage {

  uid:string	
	photoURL:string = "assets/img/loading.gif"
	username:string = "Cargando datos..."
	email:string = "Cargando datos..."
	location_latitude:number
	location_longitude:number
  contactId:string
  countContacts:number
  countPublications:number

  profileContact:string
  publications:FirebaseListObservable<any>

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
              public angularFire: AngularFireDatabase,
              private toast: Toast,
              private publicationProvider: PublicationProvider) {

    this.profileContact = 'profile'

    this.uid = this.navParams.data.uid
    this.contactId = this.navParams.data.dataContactId

    firebase.database().ref('/users/' + this.contactId).on('value', (snap) => {
      if (snap.val() !== null) {
          
          this.photoURL = snap.val().photoURL
          this.username = snap.val().username
          this.email = snap.val().email

          this.location_latitude = snap.val().position.latitude
          this.location_longitude = snap.val().position.longitude

        }
    });

    this.getDataContact()

  }

  getDataContact() {
    this.publications = this.angularFire.list('/users/' + this.contactId + '/publications/')
    this.angularFire.list('/users/' + this.contactId + '/publications/').forEach(item => {
      this.countPublications = item.length
    })
    this.angularFire.list('/users/' + this.contactId + '/contacts/').forEach(item => {
      this.countContacts = item.length
    })
  }

  btnSeePublications() {
    this.profileContact = 'publications'
  }

  btnLikePublication(publication) {       
    this.publicationProvider.likePublication(this.contactId, publication, this.uid).then(() => {})
  }

  btnSendEmail() {

    let emailConatact = this.email
    let emailUser:String
    
    firebase.database().ref('/users/'+this.uid).once('value', user => {
      emailUser = user.val().email
    })

    this. navCtrl.push("SendEmailPage", {
      emailContact: emailConatact,
      emailUser: emailUser,
      uid: this.uid
    }, {animate:true}) 

  }

}
