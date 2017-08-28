import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'

import { Camera, CameraOptions } from '@ionic-native/camera'

import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-logoutimage',
  templateUrl: 'logoutimage.html',
  providers: [Camera]
})
export class LogoutimagePage {

  progressLoadPhotoChange
  img_logo_user: string = "assets/icon/favicon.ico"
  uid: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera) {

    this.uid = navParams.data.uid

  }

  image() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData

      let uploadTask = firebase.storage().ref().child('photoPerfilUser/' + this.uid + '.jpeg')
        .putString(imageData, 'base64', {
          contentType: 'image/png'
        });

      uploadTask.on('state_changed', (snapshot) => {
        this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif'
        this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, err => {
        alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde')
      }, () => {
        this.img_logo_user = base64Image;
        let url = uploadTask.snapshot.downloadURL

        firebase.database().ref('/users/' + this.uid).update({
          photoURL: url
        });
        this.navCtrl.setRoot("TabsPage", {}, { animate: false })

      });
    }, (err) => {

    });
  }

  btnOpenCamera() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;

      let uploadTask = firebase.storage().ref().child('photoPerfilUser/' + this.uid + '.jpeg')
        .putString(imageData, 'base64', {
          contentType: 'image/png'
        });

      uploadTask.on('state_changed', (snapshot) => {
        this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif'
        this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, err => {
        alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde')
      }, () => {
        this.img_logo_user = base64Image
        let url = uploadTask.snapshot.downloadURL

        firebase.database().ref('/users/' + this.uid).update({
          photoURL: url
        });
        this.navCtrl.setRoot("TabsPage", {}, { animate: false })

      });
    }, (err) => {

    });
  }


  save() {
    this.navCtrl.setRoot("TabsPage", {}, { animate: false })
  }

}
