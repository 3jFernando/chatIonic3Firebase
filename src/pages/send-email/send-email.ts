import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer'
import { Toast } from '@ionic-native/toast'

@IonicPage()
@Component({
  selector: 'page-send-email',
  templateUrl: 'send-email.html',
  providers: [EmailComposer, Toast]
})
export class SendEmailPage {

	emailContact
	emailUser
	txt_subject
	txt_message

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						private emailComposer: EmailComposer,
  						private toast: Toast) {

  	this.emailContact = this.navParams.data.emailContact
		this.emailUser = this.navParams.data.emailUser

		this.txt_subject = ""
		this.txt_message = ""

  }

  btnCancelEmail() {
  	this.navCtrl.pop()
  }

  btnSendEmail() {
  	this.emailComposer.isAvailable().then((avalible: boolean) => {
  		if(avalible) {

 				var email = {
 					to: this.emailContact,
 					cc: this.emailUser,
 					//bcc: [],
 					//attachments: [],
 					subject: this.txt_subject,
 					body: this.txt_message,
 					isHtml: true
 				}

 				this.emailComposer.open(email)

  		} else {
  			this.toast.show(
  				'El dispositivo no es compatible con el servicio de EMAIL',
  				'5000',
  				'bottom'
  			).subscribe(toast => {})
  		}
  	})
  }

}
