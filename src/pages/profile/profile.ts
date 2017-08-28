import { 
  Component, 
  NgZone } from '@angular/core'
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  App, 
  NavParams, 
  AlertController } from 'ionic-angular'
import { 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'
import { 
  Camera, 
  CameraOptions } from '@ionic-native/camera'
import { 
  Geolocation } from '@ionic-native/geolocation'
import { 
  Toast } from '@ionic-native/toast'
import { 
  Diagnostic } from '@ionic-native/diagnostic'

//providers data
import {
  UserProvider
} from '../../providers/user/user'

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [
    Camera, 
    Geolocation, 
    Toast, 
    AngularFireDatabase, 
    Diagnostic,
    UserProvider
  ]
})
export class ProfilePage {

    userProfile:any
    zone: NgZone

    //data user
    txt_email: string = "Cargando datos..."
    txt_username: string = "Cargando datos..."
    img_logo_user: string = 'assets/img/loading.gif'
    uid:string

    progressLoadPhotoChange:number
    nametitle:string

    email:string
    location_latitude:any
    location_longitude:any    

    countContacts:number
    countPublications:number

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public loading: LoadingController,
        public app: App,
        private camera: Camera,
        public params: NavParams,
        public alertCtrl: AlertController,
        public geolocation: Geolocation,
        public toast: Toast,
        public angularFire: AngularFireDatabase,
        public diagnostic: Diagnostic,
        private userProvider: UserProvider) {

        this.uid = this.navParams.data.uid

        this.zone = new NgZone({})
        this.zone.run(() => {
          firebase.database().ref('/users/' + this.uid).on('value', (snap) => {
            if (snap.val() !== null) {
              
              this.uid = snap.key;
              this.txt_email = snap.val().email
              this.txt_username = snap.val().username
              this.img_logo_user = snap.val().photoURL
              this.location_latitude = snap.val().position.latitude
              this.location_longitude = snap.val().position.longitude
              this.nametitle = snap.val().username
              
              this.getDataUser()

            }
          })
        })

    }

    getDataUser() {
      this.angularFire.list('/users/' + this.uid + '/publications/').forEach(item => {
        this.countPublications = item.length
      })
      this.angularFire.list('/users/' + this.uid + '/contacts/').forEach(item => {
        this.countContacts = item.length
      })
    }

    save() {
      if (this.txt_email !== null && this.txt_username !== null) {
        this.userProvider.updateData(this.uid, this.txt_username, this.txt_email).then(() => {
          this.toast.show('Datas actualizados exitosamente...', '5000', 'bottom').subscribe(toast => {})
        }).catch((err) => {
          this.toast.show('Error al tratar de actualizar los datos del usuario', '5000', 'bottom').subscribe(toast => {})
        })
      } else {
        alert("El correo electronico y tu nombre no pueden estar vacios");
      }
    }

    image() {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 310,
        targetHeight: 310
      }

      this.camera.getPicture(options).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData

      let uploadTask = firebase.storage().ref().child('photoPerfilUser/' + this.uid + '.jpeg')
        .putString(imageData, 'base64', {
          contentType: 'image/png'
        })

        uploadTask.on('state_changed', (snapshot) => {
          this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif';
          this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, err => {
          alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
        }, () => {
          this.img_logo_user = base64Image
          this.userProvider.updatePhoto(this.uid, uploadTask.snapshot.downloadURL)
        })
      }, (err) => {})
    }

    btnOpenCamera() {

        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            targetWidth: 310,
            targetHeight: 310
        }

        this.camera.getPicture(options).then((imageData) => {

            let base64Image = 'data:image/jpeg;base64,' + imageData

            let uploadTask = firebase.storage().ref().child('photoPerfilUser/' + this.uid + '.jpeg')
                .putString(imageData, 'base64', {
                    contentType: 'image/png'
                })

            uploadTask.on('state_changed', (snapshot) => {
                this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif'
                this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, err => {
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde')
            }, () => {
                this.img_logo_user = base64Image
                this.userProvider.updatePhoto(this.uid, uploadTask.snapshot.downloadURL)
            })
        }, (err) => {})
    }

    updatePosition() {
        this.confirmUpdatePosition()
    }

    confirmUpdatePosition() {

       //locactions authorization true  
              this.diagnostic.isLocationAuthorized()
                .then((isAvailable) => {
                  if(isAvailable == true) {

                    //locations enabled false
                    this.diagnostic.isLocationEnabled()
                      .then((isAvailable) => {
                        if(isAvailable == true) {

                          this.alertCtrl.create({
                          title: 'NUEVA UBICACION!',
                          message: '¿Esta seguro que desea actualizar su ubicacion?',
                          buttons: [
                            {
                              text: 'CANCELAR'
                            },
                            {
                              text: 'ACTUALIZAR',
                              handler: () => {

                                let loadingPosition = this.loading.create({
                                    content: "Obteniedo la nueva ubicacion..."
                                })
                                loadingPosition.present();
                                this.geolocation.getCurrentPosition().then((resp) => {
                                    this.location_latitude = resp.coords.latitude
                                    this.location_longitude = resp.coords.longitude

                                    let coords = {
                                      latitude: this.location_latitude,
                                      longitude: this.location_longitude
                                    }    

                                    this.userProvider.updatePosition(this.uid, coords).then(() => {
                                        loadingPosition.dismiss()
                                    }).catch((err) => {
                                        alert("Error al tratar de actualizar la localizacion" + err)
                                    })

                                }).catch((err) => {
                                    loadingPosition.dismiss()
                                    alert("Error al obtener la nueva posicion, " + err)
                                })
                               
                              }
                            }
                          ]  
                        }).present()
                         
                        } else {
                          this.diagnostic.switchToLocationSettings();
                          this.toast.show(`Activa la localizacion del dispositivo`, '5000', 'bottom').subscribe(toast => {});
                        }
                      }).catch((e) => {
                        alert("error" + e)
                      })

                  } else {
                    this.toast.show(`La aplicacion necesita permisos para utilizar la localizacion`, '5000', 'bottom').subscribe(
                      toast => {}
                    )
                  }
                }).catch((e) => {
                  alert("error" + e)
                })

    }

    close_section() {
        this.alertCtrl.create({
            title: 'CERRAR SESION',
            message: "¿Esta seguro que desea cerrar su sesion?",
            buttons: [
                { text: 'QUEDARME', handler: () => { } },
                {
                    text: "VOLVERE",
                    handler: () => {
                        let load = this.loading.create({
                            content: "Saliendo... Recuerda volver ;)"
                        });
                        load.present()    

                        firebase.auth().signOut().then(() => {                            
                            load.dismiss()                    
                            this.navCtrl.setRoot("WelcomePage", {}, {animate:false})
                        }).catch((err) => {
                            load.dismiss()
                            alert("Falla :/... firebase close section: " + err);
                        });
                    }
                }
            ]
        }).present()

    }

}
