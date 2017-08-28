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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
//providers data
import { InvitedProvider } from '../../providers/invited/invited';
import { NotificationProvider } from '../../providers/notification/notification';
var AddcontactPage = (function () {
    function AddcontactPage(navCtrl, navParams, angularFire, zone, loading, alertCtrl, http, toast, invitedProvider, notificationProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularFire = angularFire;
        this.zone = zone;
        this.loading = loading;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.toast = toast;
        this.invitedProvider = invitedProvider;
        this.notificationProvider = notificationProvider;
        this.uid = navParams.data.uid;
        this.zone = new NgZone({});
        this.zone.run(function () {
            firebase.database().ref('/users/' + _this.uid).on('value', function (snap) {
                if (snap.val() !== null) {
                    _this.username = snap.val().username;
                    _this.photoURL = snap.val().photoURL;
                }
            });
        });
    }
    AddcontactPage.prototype.ionViewDidEnter = function () {
        this.users = this.angularFire.list('/users');
    };
    AddcontactPage.prototype.addUser = function (userAdd) {
        var _this = this;
        this.alertCtrl.create({
            title: "ENVIAR SOLICITUD",
            message: "¿Esta seguro que desea enviarle la solicitud de amista al usuario?",
            buttons: [
                { text: 'CANCELAR', handler: function () { } },
                {
                    text: 'ENVIAR',
                    handler: function () {
                        var load = _this.loading.create({
                            content: "Por favor espera..."
                        });
                        load.present();
                        _this.invitedProvider.sendInvited(_this.uid, userAdd.$key).then(function () {
                            _this.toast.show('Solicitud de amistad enviada!', '5000', 'bottom').subscribe(function (toast) { });
                            _this.notificationProvider.sendNotification(userAdd.token, _this.username, _this.photoURL, 'Te envio una solicitud de amistad!');
                        });
                        load.dismiss();
                    }
                }
            ]
        }).present();
    };
    return AddcontactPage;
}());
AddcontactPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-addcontact',
        templateUrl: 'addcontact.html',
        providers: [
            AngularFireDatabase,
            Toast,
            InvitedProvider,
            NotificationProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AngularFireDatabase,
        NgZone,
        LoadingController,
        AlertController,
        Http,
        Toast,
        InvitedProvider,
        NotificationProvider])
], AddcontactPage);
export { AddcontactPage };
//# sourceMappingURL=addcontact.js.map