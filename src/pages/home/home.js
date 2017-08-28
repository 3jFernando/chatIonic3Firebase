var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, NgZone, ElementRef } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
var HomePage = (function () {
    function HomePage(navCtrl, platform, zone, angularFire, geolocation, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.zone = zone;
        this.angularFire = angularFire;
        this.geolocation = geolocation;
        this.toast = toast;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        // callback...
        this.modeCallback = function (mode, lat, lng, realTime) {
            return new Promise(function (resolve, reject) {
                _this.mode = mode;
                _this.start = new google.maps.LatLng(lat, lng);
                _this.end = new google.maps.LatLng(_this.coords_lat, _this.coords_lng);
                if (realTime == true) {
                    _this.calculateAndDisplayRouteRealTime(mode);
                    resolve();
                }
                else {
                    _this.calculateAndDisplayRoute(_this.mode);
                    resolve();
                }
            });
        };
        this.zone = new NgZone({});
        platform.ready().then(function () {
            _this.loadDataUser();
            _this.initMap();
        });
    }
    HomePage.prototype.loadDataUser = function () {
        var _this = this;
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', function (snap) {
                        if (snap.val() !== null) {
                            _this.uid = snap.key;
                            _this.username = snap.val().username;
                            _this.photoURL = snap.val().photoURL;
                            _this.coords_lat = snap.val().position.latitude;
                            _this.coords_lng = snap.val().position.longitude;
                            _this.putMarkerUserPosition(_this.coords_lat, _this.coords_lng);
                            _this.loadContacts();
                        }
                    });
                }
            });
        });
    };
    HomePage.prototype.initMap = function () {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 10,
            center: { lat: 1.838658, lng: -76.010628 }
        });
        this.directionsDisplay.setMap(this.map);
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(this.map);
    };
    HomePage.prototype.putMarkerUserPosition = function (latitude, longitude) {
        var _this = this;
        var marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            animation: google.maps.Animation.DROP,
            map: this.map,
            title: "Tu Position",
            icon: 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
        });
        var contentString = "<div>" +
            "<div style='display:inline-flex;'>" +
            "<img src='" + this.photoURL + "' style='width:30px; height:30px; border-radius:30px;'/>" +
            "<b style='color:blue; padding-top: 8px; padding-left: 4px; font-size: 15px; text-transform: uppercase;'>" + this.username + "</b>" +
            "</div>";
        var inforwindows = new google.maps.InfoWindow({
            content: contentString
        });
        marker.setMap(this.map);
        marker.addListener('click', function () {
            inforwindows.open(_this.map, marker);
        });
    };
    HomePage.prototype.loadContacts = function () {
        var _this = this;
        this.angularFire.list('/users/' + this.uid + '/contacts/').forEach(function (contacts) {
            var _loop_1 = function (i_contacts) {
                var contactId = contacts[i_contacts].contactId;
                _this.angularFire.list('/users/').forEach(function (users) {
                    for (var i_users = 0; i_users < users.length; i_users++) {
                        var userId = users[i_users].$key;
                        var coords_contacts = users[i_users].position;
                        var coord_lat = JSON.stringify(coords_contacts.latitude);
                        var coord_lng = JSON.stringify(coords_contacts.longitude);
                        if (userId == contactId) {
                            var iconMarkerContact = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_orange.png';
                            _this.generateMarkersUsers(coord_lat, coord_lng, iconMarkerContact, users[i_users].photoURL, users[i_users].username);
                        }
                    }
                });
            };
            for (var i_contacts = 0; i_contacts < contacts.length; i_contacts++) {
                _loop_1(i_contacts);
            }
        });
    };
    HomePage.prototype.generateMarkersUsers = function (coord_lat, coord_lng, iconMarker, photoURL, username) {
        var _this = this;
        var latLng = new google.maps.LatLng(coord_lat, coord_lng);
        var marker = new google.maps.Marker({
            position: latLng,
            animation: google.maps.Animation.DROP,
            map: this.map,
            icon: iconMarker
        });
        var contentString = "<div><div style='display:inline-flex;'>" +
            "<img src='" + photoURL + "' style='width:30px; height:30px; border-radius:30px;'/>" +
            "<b style='color:blue; padding-top: 8px; padding-left: 4px; font-size: 15px; text-transform: uppercase;'>" + username + "</b>" +
            "</div></div>";
        var inforwindows = new google.maps.InfoWindow({
            content: contentString
        });
        marker.setMap(this.map);
        marker.addListener('click', function () {
            inforwindows.open(_this.map, marker);
        });
    };
    HomePage.prototype.calculateAndDisplayRoute = function (mode) {
        var _this = this;
        this.directionsService.route({
            origin: this.start,
            destination: this.end,
            travelMode: mode
        }, function (response, status) {
            if (status === 'OK') {
                _this.directionsDisplay.setDirections(response);
                _this.directionsDisplay.setMap(_this.map);
            }
            else {
                alert('Directions request failed due to ' + status);
            }
        });
    };
    HomePage.prototype.calculateAndDisplayRouteRealTime = function (mode) {
    };
    HomePage.prototype.createRoute = function () {
        this.navCtrl.push("CreateroutePage", {
            mode: this.modeCallback
        });
    };
    return HomePage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], HomePage.prototype, "mapElement", void 0);
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [
            AngularFireDatabase,
            Geolocation,
            Toast
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        Platform,
        NgZone,
        AngularFireDatabase,
        Geolocation,
        Toast])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map