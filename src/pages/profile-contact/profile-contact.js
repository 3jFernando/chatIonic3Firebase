var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
//providers data
import { PublicationProvider } from '../../providers/publication/publication';
var ProfileContactPage = (function () {
    function ProfileContactPage(navCtrl, navParams, angularFire, toast, publicationProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularFire = angularFire;
        this.toast = toast;
        this.publicationProvider = publicationProvider;
        this.photoURL = "assets/img/loading.gif";
        this.username = "Cargando datos...";
        this.email = "Cargando datos...";
        this.profileContact = 'profile';
        this.uid = this.navParams.data.uid;
        this.contactId = this.navParams.data.dataContactId;
        firebase.database().ref('/users/' + this.contactId).on('value', function (snap) {
            if (snap.val() !== null) {
                _this.photoURL = snap.val().photoURL;
                _this.username = snap.val().username;
                _this.email = snap.val().email;
                _this.location_latitude = snap.val().position.latitude;
                _this.location_longitude = snap.val().position.longitude;
            }
        });
        this.getDataContact();
    }
    ProfileContactPage.prototype.getDataContact = function () {
        var _this = this;
        this.publications = this.angularFire.list('/users/' + this.contactId + '/publications/');
        this.angularFire.list('/users/' + this.contactId + '/publications/').forEach(function (item) {
            _this.countPublications = item.length;
        });
        this.angularFire.list('/users/' + this.contactId + '/contacts/').forEach(function (item) {
            _this.countContacts = item.length;
        });
    };
    ProfileContactPage.prototype.btnSeePublications = function () {
        this.profileContact = 'publications';
    };
    ProfileContactPage.prototype.btnLikePublication = function (publication) {
        this.publicationProvider.likePublication(this.contactId, publication, this.uid).then(function () { });
    };
    ProfileContactPage.prototype.btnSendEmail = function () {
        var emailConatact = this.email;
        var emailUser;
        firebase.database().ref('/users/' + this.uid).once('value', function (user) {
            emailUser = user.val().email;
        });
        this.navCtrl.push("SendEmailPage", {
            emailContact: emailConatact,
            emailUser: emailUser,
            uid: this.uid
        }, { animate: true });
    };
    return ProfileContactPage;
}());
ProfileContactPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-profile-contact',
        templateUrl: 'profile-contact.html',
        providers: [
            AngularFireDatabase,
            Toast,
            PublicationProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AngularFireDatabase,
        Toast,
        PublicationProvider])
], ProfileContactPage);
export { ProfileContactPage };
//# sourceMappingURL=profile-contact.js.map