import { 
  Component, 
  NgZone, 
  ViewChild } from '@angular/core'
import { Content } from 'ionic-angular'
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  ActionSheetController, 
  LoadingController } from 'ionic-angular'
import { 
  Camera, 
  CameraOptions } from '@ionic-native/camera'
import { Toast } from '@ionic-native/toast'

import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'

//providers data
import { MessageProvider } from '../../providers/message/message'
import { NotificationProvider } from '../../providers/notification/notification'

@IonicPage()
@Component({
    selector: 'page-sendmessage',
    templateUrl: 'sendmessage.html',
    providers: [
      AngularFireDatabase, 
      Toast, 
      Camera, 
      MessageProvider, 
      NotificationProvider
    ]
})
export class SendmessagePage {

    @ViewChild(Content) content: Content

    contactId:string = ""
    txt_message:string = ""
    username:string = "Cargando datos..."
    email:string = ""
    photoURL:string = "assets/img/logo.png"
    contactProfile: any
    tokenContact

    //datos user params
    uid:string = "" 
    usernameUser:string = ""
    photoURLUser:string = ""

    //messages
    messages: FirebaseListObservable<any>
    imageLoadPhotoMessage:string = ""
    progressLoadPhotoMessage:number = 0
    chat:string = ""
    sendingLoadingMessaje:string = ""

    //emogis
    listEmogisfeliz = new Array
    listEmogiscoqueto = new Array
    listEmogissorprendido = new Array
    listEmogistriste = new Array
    listEmogisenojado = new Array
    listEmogisvipolaridad = new Array

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public zone: NgZone,
        public angularFire: AngularFireDatabase,
        public toast: Toast,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        private camera: Camera,
        public loadingCtrl: LoadingController,
        private messageProvider: MessageProvider,
        private notificationProvider: NotificationProvider) {

        this.uid = navParams.data.uid
        this.usernameUser = navParams.data.username
        this.photoURLUser = navParams.data.photoURL

        this.contactId = navParams.data.contactId
        this.chat = 'messages'

        this.sendingLoadingMessaje = ""
        this.imageLoadPhotoMessage = "assets/img/loading.gif"

        this.zone = new NgZone({});
        
        this.zone.run(() => {
          firebase.database().ref('/users/' + this.contactId).on('value', (snap) => {
            if (snap.val() !== null) {
              
              this.contactProfile = snap.val()
              this.photoURL = this.contactProfile.photoURL
              this.username = this.contactProfile.username
              this.email = this.contactProfile.email
              this.tokenContact = this.contactProfile.token
              
            } else {
              
              alert("no existe, debe iniciar sesion nuevamente")
              firebase.auth().signOut().then(() => {
                  this.navCtrl.popToRoot()
              }).catch((err) => {
                  alert("Falla :/... debe iniciar sesion nuevamente " + err)
              });

            }
          });        
        });
        

    }

    toScroll() {
      setTimeout(() => {
        this.content.scrollToBottom()
      }, 800)
    }

    ionViewDidEnter() {  

      this.messages = this.angularFire.list('/users/'+this.uid+'/chats/'+this.contactId)
      this.toScroll()
      this.loadEmogis()

    }

    //start emogis
    loadEmogis() {

      this.listEmogisfeliz = []
      this.listEmogiscoqueto = []
      this.listEmogissorprendido = []
      this.listEmogistriste = []
      this.listEmogisenojado = []
      this.listEmogisvipolaridad = []

      this.loadfeliz()
      this.loadcoqueto()
      this.loadsorprendido()
      this.loadtriste()
      this.loadenojado()
      this.loadvipolaridad()
    }

    loadfeliz() {
      var path = "assets/img/emogis/feliz/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogisfeliz.push({
          src: path + i + ext
        })    
      }
    }
    loadcoqueto() {
      var path = "assets/img/emogis/coqueto/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogiscoqueto.push({
          src: path + i + ext
        })    
      }
    }
    loadsorprendido() {
      var path = "assets/img/emogis/sorprendido/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogissorprendido.push({
          src: path + i + ext
        })    
      }
    }
    loadtriste() {
      var path = "assets/img/emogis/triste/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogistriste.push({
          src: path + i + ext
        })    
      }
    }
    loadenojado() {
      var path = "assets/img/emogis/enojado/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogisenojado.push({
          src: path + i + ext
        })    
      }
    }
    loadvipolaridad() {
      var path = "assets/img/emogis/vipolaridad/"
      var ext = ".png"
      for(var i = 1; i <= 8; i++) {
        this.listEmogisvipolaridad.push({
          src: path + i + ext
        })    
      }
    }

    clickEmogi(emogisrc) {

      var tipeMessage = "emogi"
      
      this.saveMessages(tipeMessage, emogisrc)
      this.chat = 'messages'
      
    }
    //end emogis

    btnGoMessagesSegment() {
      this.toScroll()
    }

    sendMessage() {

      var tipeMessage = "text"

      if(this.txt_message.length >= 1) {                
        this.saveMessages(tipeMessage, this.txt_message)        
      } else {
        this.toast.show("No puedes enviar campos vacios", '5000', 'top').subscribe(toast => {})
      }

    }

    saveMessages(tipeMessage, message) {

      this.messageProvider.saveMessages(tipeMessage, message, this.contactId, this.uid).then(() => {
        this.txt_message = ""  
        this.content.scrollToBottom()
      })
      this.messageProvider.saveLastMessages(tipeMessage, message, this.contactId, this.uid).then(() => {
        this.notificationProvider.sendNotification(this.tokenContact, this.usernameUser, this.photoURLUser, message)
      })

    }

    optionsMessage(key, text) {

      this.alertCtrl.create()
      .setTitle('MENSAJE')
      .setMessage('Por favor elige una opcion!')

      .addInput({
        type: 'radio',
        label: 'Compartir Mensaje',
        value: 'share_message',
        checked: true
      })

      .addInput({
        type: 'radio',
        label: 'Eliminar Mensaje',
        value: 'delete_message',
        checked: false
      })

      .addButton('CANCELAR')
      .addButton({
        text: 'ACEPTAR',
        handler: item => {
          if(item === 'share_message') {
            this.shareMessage()
          } else if(item === 'delete_message') {
            this.removeMessage(key)
          }
        }
      }).present()

    }

    shareMessage() {

    }

    removeMessage(key) {

      this.alertCtrl.create({
        title: 'ELIMINAR!',
        message: '¿Esta seguro que desea eliminar el mensaje, recuerda que no podras recuperarlo; ademas '+ this.username +' podra seguir viendolo?',
        buttons: [
          {
            text: 'CANCELAR',
            handler: () => { }
          },{
            text: 'ELIMINAR',
            handler: () => {
              this.messageProvider.removeMessage(this.uid, this.contactId, key).then(() => {
                this.toast.show("Mensaje Eliminado", "5000", "bottom").subscribe(toast => {})
              })
            }
          }
        ]
      }).present()

    }

    addFileImage() {

      this.actionSheetCtrl.create({
        title: 'ENVIAR UNA FOTOGRAFIA!',
        buttons: [
          {
            text: 'Desde la Galeria',
            handler: () => {
              this.openGallery()
            }
          },{
            text: 'Desde la Camara',
            handler: () => {
              this.openCamera()
            }
          },{
            text: 'CANCELAR',
            role: 'cancel',
            handler: () => {}
          }
        ]
      }).present()

    }

    openGallery() {
      
      var tipeMessage = "image"
      var nameImage = Math.floor(Math.random() * 1000)

      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }

      this.camera.getPicture(options).then((imageData) => {

        this.sendingLoadingMessaje = this.imageLoadPhotoMessage        
        this.content.scrollToBottom()

        let uploadTask = firebase.storage().ref().child('users/' + this.uid + '/chats/images/' + nameImage + '.png')
          .putString(imageData, 'base64', {
            contentType: 'image/png'
          })

        uploadTask.on('state_changed', (snapshot) => {
          this.progressLoadPhotoMessage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, err => {
          alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde')
        }, () => {
          
          this.saveMessages(tipeMessage, uploadTask.snapshot.downloadURL)

          this.sendingLoadingMessaje = ""
          this.progressLoadPhotoMessage = 0
        })
      }, (err) => {

      })

    }

    openCamera() {

      var tipeMessage = "image"
      var nameImage = Math.floor(Math.random() * 1000)

      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {

        this.sendingLoadingMessaje = this.imageLoadPhotoMessage 
        this.content.scrollToBottom()

        let uploadTask = firebase.storage().ref().child('users/' + this.uid + '/chats/images/' + nameImage + '.png')
          .putString(imageData, 'base64', {
            contentType: 'image/png'
          })

        uploadTask.on('state_changed', (snapshot) => {
          this.progressLoadPhotoMessage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, err => {
          alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde')
        }, () => {
          
          this.saveMessages(tipeMessage, uploadTask.snapshot.downloadURL)

          this.sendingLoadingMessaje = ""
          this.progressLoadPhotoMessage = 0
        })
      }, (err) => {

      })

    }

    goProfileContact() {

      this.navCtrl.push("ProfileContactPage", {            
          dataContactId: this.contactId,
          uid: this.uid
      }, {animate:false})

    }

    goInvitesJoin() {

      this.navCtrl.push("InvitesJoinPage", {
        uid: this.uid,
        userUsername: this.usernameUser, 
        userPhotoURL: this.photoURLUser,
        contactId: this.contactId,
        contact: this.contactProfile,
        username: this.username,
        photoURL: this.photoURL,
      }, {animate:true})

    }

}
