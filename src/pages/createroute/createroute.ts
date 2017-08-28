import { 
  Component, 
  NgZone } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  AlertController, 
  ActionSheetController, 
  NavParams } from 'ionic-angular';
import { 
  Diagnostic } from '@ionic-native/diagnostic';
import { 
  Toast } from '@ionic-native/toast';
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-createroute',
  templateUrl: 'createroute.html',
  providers: [
    AngularFireDatabase, 
    Diagnostic, 
    Toast
  ]
})
export class CreateroutePage {

  uid:string
  lat_contact:any
  lng_contact:any

  contacts: FirebaseListObservable<any>
  users: FirebaseListObservable<any>

  constructor(public navCtrl: NavController,
    public angularFire: AngularFireDatabase,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public params: NavParams,
    public diagnostic: Diagnostic,
    public toast: Toast) {

    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged(user => {
      this.zone.run(() => {
        if (user) {

          firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', (snap) => {
            if (snap.val() !== null) {
              this.uid = snap.key
            }
          })

        }
      })
    })

  }

  ionViewDidEnter() {
    this.loadUsers()
    this.loadContacts()
  }

  loadUsers() {
    this.users = this.angularFire.list('/users/')
  }

  loadContacts() {
    this.contacts = this.angularFire.list('/users/' + this.uid + '/contacts/')
  }

  createRoute(lat, lng) {    

    let alert = this.alertCtrl.create()
    alert.setTitle('GENERAR RUTA')
    alert.setMessage('¿Esta seguro que desea generar la ruta con el usuario seleccionado?')
    
    alert.addInput({
      type: 'radio',
      label: 'Ruta Basica',
      value: 'route_basic',
      checked: true
    });  

    alert.addInput({
      type: 'radio',
      label: 'Ruta En Tiempo Real',
      value: 'route_avanced',
      checked: false
    });

    alert.addButton('Cancelar')
    alert.addButton({
      text: 'Crear',
      handler: tipe_route => {
        this.confirmRuteMode(lat, lng, tipe_route)
      }
    });
    
    alert.present();
  }

  confirmRuteMode(lat, lng, tipe_route) {
    this.actionSheetCtrl.create({
      title: 'SELECCIONA EL TIPO DE RUTA',
      buttons: [
        {
          text: 'Conduciendo Auto',
          handler: () => {
            this.calcRoute('DRIVING', lat, lng, tipe_route)
          }
        },
        {
          text: 'Caminando',
          handler: () => {
            this.calcRoute('WALKING', lat, lng, tipe_route)
          }
        },
        {
          text: 'Ciclo Via',
          handler: () => {
            this.calcRoute('BICYCLING', lat, lng, tipe_route)
          }
        },
        {
          text: 'Transmilenio',
          handler: () => {
            this.calcRoute('TRANSIT', lat, lng, tipe_route)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    }).present()
  }

  calcRoute(mode, lat, lng, tipe_route) {

    var realTime = false

    if(tipe_route === 'route_basic') {
      
      var callback = this.params.get("mode");
      callback(mode, lat, lng, realTime).then(() => {
        this.navCtrl.pop()
      })

    } else if(tipe_route === 'route_avanced') {
      this.alertCtrl.create({
        title: 'Localizador!',
        message: 'Por favor para continuar activid la UBICACIÓN en tu dispositivo',
        buttons: [
          {
            text: 'Rota Basica',
            handler: () => {
              var callback = this.params.get("mode")
              callback(mode, lat, lng, realTime).then(() => {
                this.navCtrl.pop()
              })
            }
          },
          {
            text: 'Activar',
            handler: () => {

              //locactions authorization true  
              this.diagnostic.isLocationAuthorized()
                .then((isAvailable) => {
                  if(isAvailable == true) {

                    //locations enabled false
                    this.diagnostic.isLocationEnabled()
                      .then((isAvailable) => {
                        if(isAvailable == true) {
                          
                          var callback = this.params.get("mode")
                          realTime = true
                          callback(mode, lat, lng, realTime).then(() => {
                            this.navCtrl.pop()
                          })

                        } else {

                          this.diagnostic.switchToLocationSettings()

                          this.toast.show(`Activa la localizacion del dispositivo`, '5000', 'bottom').subscribe(toast => {
                            this.confirmRuteMode(lat, lng, tipe_route)
                          })
                        }
                      }).catch((e) => {
                        this.toast.show('No se pudo crear la ruta, error: ' + e, '5000', 'bottom').subscribe(toast => {})
                      })

                  } else {
                    this.toast.show(`La aplicacion necesita permisos para utilizar la localizacion`, '5000', 'bottom').subscribe(toast => {})
                  }
                }).catch((e) => {
                  this.toast.show(`La aplicacion necesita autotizacion para utilizar la localizacion`, '5000', 'bottom').subscribe(toast => {})
                })
            }
          }
        ]  
      }).present()
    }  

  }


}