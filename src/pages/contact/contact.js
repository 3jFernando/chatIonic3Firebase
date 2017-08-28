var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var ContactPage = (function () {
    function ContactPage(navCtrl, angularFire) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.angularFire = angularFire;
        this.photoURL = "assets/img/loading.gif";
        this.username = "Cargando datos...";
        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', function (snap) {
                        if (snap.val() !== null) {
                            _this.uid = snap.key;
                            _this.photoURL = snap.val().photoURL;
                            _this.username = snap.val().username;
                            _this.email = snap.val().email;
                            _this.loadUsers();
                            _this.loadContacts();
                            _this.loadInviteds();
                        }
                    });
                }
            });
        });
    }
    ContactPage.prototype.loadUsers = function () {
        this.users = this.angularFire.list('/users/');
    };
    ContactPage.prototype.loadContacts = function () {
        var _this = this;
        this.contacts = this.angularFire.list('/users/' + this.uid + '/contacts/');
        this.angularFire.list('/users/' + this.uid + '/contacts/').forEach(function (item) {
            _this.countContacts = item.length;
        });
    };
    ContactPage.prototype.loadInviteds = function () {
        var _this = this;
        this.angularFire.list('/users/' + this.uid + '/inviteds/').forEach(function (item) {
            _this.countInviteds = item.length;
        });
    };
    ContactPage.prototype.sendMessage = function (contact) {
        this.navCtrl.push("SendmessagePage", {
            uid: this.uid,
            photoURL: this.photoURL,
            username: this.username,
            contactId: contact.contactId
        }, { animate: false });
    };
    ContactPage.prototype.goPerfilContact = function (contact) {
        this.navCtrl.push("ProfileContactPage", {
            dataContactId: contact.contactId,
            uid: this.uid
        }, { animate: false });
    };
    ContactPage.prototype.addContact = function () {
        this.navCtrl.push("AddcontactPage", { uid: this.uid }, { animate: false });
    };
    ContactPage.prototype.seeInviteds = function () {
        this.navCtrl.push("SeeinvitedsPage", { uid: this.uid }, { animate: false });
    };
    return ContactPage;
}());
ContactPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-contact',
        templateUrl: 'contact.html',
        providers: [
            AngularFireDatabase
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        AngularFireDatabase])
], ContactPage);
export { ContactPage };
//# sourceMappingURL=contact.js.map