import { Component } from '@angular/core'
import { IonicPage, Platform, NavController, NavParams, LoadingController } from 'ionic-angular'

import firebase from 'firebase'

@IonicPage()
@Component({
	selector: 'page-logout',
	templateUrl: 'logout.html',
})
export class LogoutPage {

	txt_username: string = ""
	txt_email: string = ""
	txt_password: string = ""

	date
	coords

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController,		
		public platform: Platform) {

	}

	create() {
		let load = this.loading.create({
			content: "Por favor espere..."
		});
		load.present();

		firebase.auth().createUserWithEmailAndPassword(this.txt_email, this.txt_password)
			.then((success) => {

				this.date = new Date().toISOString()
				this.coords = {
					latitude: 1.847071,
					longitude: -76.047399
				}

        firebase.database().ref('/users/' + JSON.stringify(success.uid)).set({
					email: this.txt_email,
					username: this.txt_username,
					photoURL: "assets/img/user/user.png",
					position: this.coords,
					createAt: this.date,
					token: ""
				}).then((snap) => {

	        load.dismiss()

					this.navCtrl.setRoot("LogoutimagePage", {
						uid: JSON.stringify(success.uid)
					}, { animate: false })

				}).catch((err) => {
					load.dismiss()
					alert("error al crear la cuenta" + err)
				});

			}).catch((err) => {
				load.dismiss();
				var errorCode = err.stack;
				var errorMessage = err.message;

				if (errorCode === 'auth/wrong-password') {
					alert('Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set..')
				}
				else if (errorCode === 'auth/invalid-email') {
					alert('Thrown if the email address is not valid.')
				}
				else if (errorCode === 'auth/user-disabled') {
					alert('Thrown if the user corresponding to the given email has been disabled. .')
				}
				else if (errorCode === 'auth/user-not-found') {
					alert('Thrown if there is no user corresponding to the given email.')
				}
				else {
					alert(errorMessage);
				}

			})
	}

}
