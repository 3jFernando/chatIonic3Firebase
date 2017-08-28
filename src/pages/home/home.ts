import { 
  Component, 
  ViewChild, 
  NgZone,
  ElementRef } from '@angular/core'
import { 
  IonicPage, 
  NavController, 
  Platform } from 'ionic-angular'
import { 
  FirebaseListObservable, 
  AngularFireDatabase } from 'angularfire2/database'
import firebase from 'firebase'
import { 
  Geolocation } from '@ionic-native/geolocation'
import { 
  Toast } from '@ionic-native/toast'

declare var google: any

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    AngularFireDatabase, 
    Geolocation, 
    Toast
  ]
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef
  map:any
  start:any
  end:any

  directionsService = new google.maps.DirectionsService
  directionsDisplay = new google.maps.DirectionsRenderer

  coords_lat:any
  coords_lng:any

  selected_users: FirebaseListObservable<any>
  selected_contacts: FirebaseListObservable<any>

  mode:string

  //realtime route
  realTimeLat:any
  realTimeLng:any

  uid:string
  username:string
  photoURL:string

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public zone: NgZone,
    public angularFire: AngularFireDatabase,
    public geolocation: Geolocation,
    public toast: Toast) {

    this.zone = new NgZone({})

    platform.ready().then(() => {
      this.loadDataUser()
      this.initMap()
    })

  }

  loadDataUser() {

    firebase.auth().onAuthStateChanged(user => {
      this.zone.run(() => {
        if (user) {

          firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', (snap) => {
            if (snap.val() !== null) {

              this.uid = snap.key
              this.username = snap.val().username
              this.photoURL = snap.val().photoURL

              this.coords_lat = snap.val().position.latitude
              this.coords_lng = snap.val().position.longitude

              this.putMarkerUserPosition(this.coords_lat, this.coords_lng)
              this.loadContacts()

            }
          })

        }
      })
    })

  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: 1.838658, lng: -76.010628 }
    })
    
    this.directionsDisplay.setMap(this.map)

    var trafficLayer = new google.maps.TrafficLayer()
    trafficLayer.setMap(this.map)

  }

  putMarkerUserPosition(latitude, longitude) {
    var marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      animation: google.maps.Animation.DROP,
      map: this.map,
      title: "Tu Position",
      icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
    })
    var contentString =
      "<div>" +
      "<div style='display:inline-flex;'>" +
      "<img src='" + this.photoURL + "' style='width:30px; height:30px; border-radius:30px;'/>" +
      "<b style='color:blue; padding-top: 8px; padding-left: 4px; font-size: 15px; text-transform: uppercase;'>" + this.username + "</b>"+
      "</div>"
    var inforwindows = new google.maps.InfoWindow({
      content: contentString
    })
    marker.setMap(this.map)
    marker.addListener('click', () => {
      inforwindows.open(this.map, marker)
    })
  }

  loadContacts() {

    this.angularFire.list('/users/' + this.uid + '/contacts/').forEach(contacts => {
      for (let i_contacts = 0; i_contacts < contacts.length; i_contacts++) {
        let contactId = contacts[i_contacts].contactId
        this.angularFire.list('/users/').forEach(users => {
          for (let i_users = 0; i_users < users.length; i_users++) {
            
            let userId = users[i_users].$key
            let coords_contacts = users[i_users].position
            var coord_lat = JSON.stringify(coords_contacts.latitude)
            var coord_lng = JSON.stringify(coords_contacts.longitude)

            if (userId == contactId) {          
              let iconMarkerContact = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png'
              this.generateMarkersUsers(coord_lat, coord_lng, iconMarkerContact, users[i_users].photoURL, users[i_users].username)
            }
          }
        })
      }
    });
  }

  generateMarkersUsers(coord_lat, coord_lng, iconMarker, photoURL, username) {
    var latLng = new google.maps.LatLng(coord_lat, coord_lng)

    var marker = new google.maps.Marker({
      position: latLng,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: iconMarker
    })
    var contentString =
      "<div><div style='display:inline-flex;'>" +
      "<img src='" + photoURL + "' style='width:30px; height:30px; border-radius:30px;'/>" +
      "<b style='color:blue; padding-top: 8px; padding-left: 4px; font-size: 15px; text-transform: uppercase;'>" + username + "</b>" +
      "</div></div>"
    var inforwindows = new google.maps.InfoWindow({
      content: contentString
    })
    marker.setMap(this.map)
    marker.addListener('click', () => {
      inforwindows.open(this.map, marker)
    });
  }

  // callback...
  modeCallback = (mode, lat, lng, realTime) => {
    return new Promise((resolve, reject) => {

      this.mode = mode
      this.start = new google.maps.LatLng(lat, lng)
      this.end = new google.maps.LatLng(this.coords_lat, this.coords_lng)

      if(realTime == true) {
        this.calculateAndDisplayRouteRealTime(mode)
        resolve()
      } else {
        this.calculateAndDisplayRoute(this.mode)
        resolve()
      }

    })
  }

  calculateAndDisplayRoute(mode) {

    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: mode
    }, (response, status) => {

      if (status === 'OK') {
        this.directionsDisplay.setDirections(response)
        this.directionsDisplay.setMap(this.map)
      } else {
        alert('Directions request failed due to ' + status)
      }

    })

  }

  calculateAndDisplayRouteRealTime(mode) {

  }

  createRoute() {
    this.navCtrl.push("CreateroutePage", {
      mode: this.modeCallback
    });
  }


}
