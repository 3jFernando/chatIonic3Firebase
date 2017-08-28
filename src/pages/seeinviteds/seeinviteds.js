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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var SeeinvitedsPage = (function () {
    function SeeinvitedsPage(navCtrl, navParams, zone, http, angularFire, alertCtrl, loadCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.http = http;
        this.angularFire = angularFire;
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.invitedsJoins = new Array;
        this.invitedsJoinsUsers = new Array;
        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    var user_data = firebase.database().ref('/users/' + JSON.stringify(user.uid));
                    user_data.on('value', function (snap) {
                        if (snap.val() !== null) {
                            _this.uid = snap.key;
                            _this.invitedsJoins = [];
                            _this.invitedsJoinsUsers = [];
                            _this.loadUsers();
                            _this.loadInviteds();
                            _this.loadInvitesJoin();
                        }
                        else {
                            alert("no existe, debe iniciar sesion nuevamente");
                            firebase.auth().signOut().then(function () {
                                _this.navCtrl.popToRoot();
                            }).catch(function (err) {
                                alert("Falla :/... debe iniciar sesion nuevamente " + err);
                            });
                        }
                    });
                }
            });
        });
    }
    SeeinvitedsPage.prototype.loadUsers = function () {
        this.users = this.angularFire.list('/users/');
    };
    SeeinvitedsPage.prototype.loadInviteds = function () {
        this.inviteds = this.angularFire.list('/users/' + this.uid + '/inviteds/');
    };
    SeeinvitedsPage.prototype.loadInvitesJoin = function () {
        var _this = this;
        this.angularFire.list('/users/').forEach(function (user) {
            for (var i = 0; i < user.length; i++) {
                _this.invitedsJoinsUsers.push(user[i]);
            }
        });
        this.angularFire.list('/users/' + this.uid + '/invitesJoinsPlan/recived').forEach(function (invited) {
            for (var i = 0; i < invited.length; i++) {
                _this.invitedsJoins.push(invited[i]);
            }
        });
    };
    SeeinvitedsPage.prototype.invitedClick = function (invitedContactId, userKey, name) {
        var _this = this;
        firebase.database().ref('/users/' + userKey).once('value', function (contact) {
            _this.tokenContact = contact.val().token;
        });
        firebase.database().ref('/users/' + this.uid).once('value', function (user) {
            _this.usernameUser = user.val().username;
            _this.photoURLUser = user.val().photoURL;
        });
        this.alertCtrl.create({
            title: "ACEPTAR INVITACION!",
            message: "¿Esta seguro que deseas aceptar la solucitud de amistad de " + name + "?",
            buttons: [
                {
                    text: 'ELIMINAR',
                    handler: function () {
                        firebase.database().ref('/users/' + _this.uid + '/inviteds/' + userKey).remove();
                    }
                },
                {
                    text: 'ACEPTAR',
                    handler: function () {
                        firebase.database().ref('/users/' + _this.uid + '/contacts/' + userKey).set({
                            contactId: userKey,
                            createAt: new Date()
                        }).then(function () {
                            firebase.database().ref('/users/' + userKey + '/contacts/' + _this.uid).set({
                                contactId: _this.uid,
                                createAt: new Date()
                            }).then(function () {
                                firebase.database().ref('/users/' + _this.uid + '/inviteds/' + userKey).remove();
                                var body = JSON.stringify({
                                    'tokens': _this.tokenContact,
                                    'profile': 'nicfire_development',
                                    'notification': {
                                        "android": {
                                            'title': _this.usernameUser,
                                            'image': _this.photoURLUser,
                                            'sound': 'default',
                                            'message': 'Acepto tu solicitud de amistad!'
                                        }
                                    }
                                });
                                var headers = new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZmYxMWM5Ny1jMmZhLTQxODMtOTg1NC00ZjU3MzQyNGViYjAifQ.tdpQPmVgcuJCu_4ihjaJYGY57mjlR97OcdT8gNv0IM0'
                                });
                                var options = new RequestOptions({ headers: headers });
                                _this.http.post('https://api.ionic.io/push/notifications/', body, options)
                                    .subscribe(function (res) {
                                }, function (err) {
                                }, function () {
                                });
                            }).catch(function (err) {
                                alert("error add contact accep invited");
                            });
                        }).catch(function (err) {
                            alert("error add contact accep invited");
                        });
                    }
                }
            ]
        }).present();
    };
    SeeinvitedsPage.prototype.goToHelp = function () {
        this.alertCtrl.create({
            title: "ACEPTAR INVITACION!",
            message: "<i>Aqui, aparecen todas las notificaciones \n        que te hayan enviado los usuarios! puedes tanto\n        aceptarlas como eliminarlas<i>",
            buttons: [{ text: 'ENTIENDO' }]
        }).present();
    };
    SeeinvitedsPage.prototype.goSeeInvitesJoin = function (join, user) {
        this.navCtrl.push("InvitesJoinSeePage", {
            join: join.$key,
            user: user,
            uid: this.uid
        }, { animate: true });
    };
    return SeeinvitedsPage;
}());
SeeinvitedsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-seeinviteds',
        templateUrl: 'seeinviteds.html',
        providers: [AngularFireDatabase]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        NgZone,
        Http,
        AngularFireDatabase,
        AlertController,
        LoadingController])
], SeeinvitedsPage);
export { SeeinvitedsPage };
//# sourceMappingURL=seeinviteds.js.map