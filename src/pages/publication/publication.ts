import { 
  Component, 
  NgZone } from '@angular/core'
import { 
  IonicPage, 
  NavController, 
  LoadingController, 
  AlertController } from 'ionic-angular'
import { 
  Camera, 
  CameraOptions } from '@ionic-native/camera';
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase'
import { 
  Toast } from '@ionic-native/toast';

//providers data
import { 
  PublicationProvider } from '../../providers/publication/publication'

@IonicPage()
@Component({
  selector: 'page-publication',
  templateUrl: 'publication.html',
  providers: [
    Camera, 
    AngularFireDatabase, 
    Toast,
    PublicationProvider
  ]
})
export class PublicationPage {

	txt_publications:string 
	img_publications:string
	imgPublications:string
	imagePublications:boolean

	publications:FirebaseListObservable<any>

	img_publications_imageData:string
	progressLoadPhotoChange:number

  zone: NgZone
  photoURL: string = "assets/img/loading.gif"  
  username: string = "Cargando datos..."
  uid:any

  constructor(public navCtrl: NavController, 
  						private camera: Camera,
  						public dialog: LoadingController,
              public alertCtrl: AlertController,
  						public angularFire: AngularFireDatabase,
              public toast: Toast,
              private publicationProvider: PublicationProvider) {
	
		this.txt_publications = ""  	
		this.img_publications = ""
		this.imgPublications = ""
		this.imagePublications = false

		this.zone = new NgZone({})
      firebase.auth().onAuthStateChanged(user => {
       	  this.zone.run(() => {
            if (user) {

         	    firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', (snap) => {
                  if (snap.val() !== null) {

                    this.uid = snap.key

                    this.photoURL = snap.val().photoURL
                    this.username = snap.val().username

                    this.getPublications()

                  }
              })      

            }
          })
      })

  }

  getPublications() {
    this.publications = this.angularFire.list('/users/' + this.uid + '/publications/')
  }

  btn_openCamera() {
  	const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.img_publications = 'data:image/jpeg;base64,' + imageData
      this.img_publications_imageData = imageData
      this.imgPublications = "assets/img/loading.gif"
      this.imgPublications = 'data:image/jpeg;base64,' + imageData
      this.imagePublications = true
    }, (err) => {

    });
  }

  btn_openGallery(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.img_publications = 'data:image/jpeg;base64,' + imageData
      this.img_publications_imageData = imageData
      this.imgPublications = "assets/img/loading.gif"
      this.imgPublications = 'data:image/jpeg;base64,' + imageData
      this.imagePublications = true
    }, (err) => {

    }); 
  }

  goPublicContent() {

  	this.img_publications = ""

    if(!this.imagePublications) {
    	let dialog = this.dialog.create({
    		content: 'Publicando....'
    	})
    	dialog.present()
    	
      this.publicationProvider.savePublication(this.uid, this.txt_publications, this.img_publications).then(() => {
        this.txt_publications = ""
        dialog.dismiss()
      })

    } else {
    	var nameImage = Math.floor(Math.random() * 20)
    	let dialog = this.dialog.create({
    		content: 'Publicando....'
    	})
    	dialog.present()
    	let uploadTask = firebase.storage().ref().child('users/' + this.uid + '/publications/' + nameImage + '.png')
          .putString(this.img_publications_imageData, 'base64', {
              contentType: 'image/png'
          });

	    uploadTask.on('state_changed', (snapshot) => {
	      this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	    }, err => {
	    	dialog.dismiss()
	      alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
	    }, () => {
	    	
	      this.img_publications = uploadTask.snapshot.downloadURL
        this.publicationProvider.savePublicationImage(this.uid, this.txt_publications, this.img_publications, nameImage).then(() => {
          this.txt_publications = ""
          this.imgPublications = ""
          this.imagePublications = false
          dialog.dismiss()
        })

	    })
    }
  }

  goCancelContent() {
  	this.txt_publications = ""
  }

  btnDeletePublication(publication) {
    firebase.database().ref('/users/'+this.uid+'/publications/'+publication.$key).once('value', snap => {
      this.alertCtrl.create({
        title: 'PUBLICACION',
        message: '¿Esta seguro que desea eliminar la publicacion?',
        buttons: [
          {
            text: 'CANCELAR',
            handler: () => {
              return
            }
          },
          {
            text: 'ELIMINAR',
            handler: () => {
              this.publicationProvider.deletePublication(this.uid, publication).then(() => {
                this.toast.show('Publicacion Eliminada.', '5000', 'bottom').subscribe(toast => {})
              })
            }
          }
        ] 
      }).present()
    })
  }

  goProfile() {
    this.navCtrl.push("ProfilePage", {uid: this.uid}, {animate:false});   
  }

  btn_openPosition() {
    
  }

}
