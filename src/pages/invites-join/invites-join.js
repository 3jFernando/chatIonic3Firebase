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
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
//providers data
import { InvitedProvider } from '../../providers/invited/invited';
import { NotificationProvider } from '../../providers/notification/notification';
var InvitesJoinPage = (function () {
    function InvitesJoinPage(navCtrl, navParams, alertCtrl, loadingCtrl, toast, http, invitedProvider, notificationProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toast = toast;
        this.http = http;
        this.invitedProvider = invitedProvider;
        this.notificationProvider = notificationProvider;
        this.invitesPlans = new Array;
        this.uid = this.navParams.data.uid;
        this.userUsername = this.navParams.data.userUsername;
        this.userPhotoURL = this.navParams.data.userPhotoURL;
        this.contactId = this.navParams.data.contactId;
        this.contact = this.navParams.data.contact;
        this.username = this.navParams.data.username;
        this.photoURL = this.navParams.data.photoURL;
        this.invitesPlans = [
            {
                id: 1,
                name: 'Juguemos football american',
                icon: 'american-football'
            },
            {
                id: 2,
                name: 'Vamos de compras',
                icon: 'briefcase'
            },
            {
                id: 3,
                name: 'Juguemos baloncesto',
                icon: 'baseball'
            },
            {
                id: 4,
                name: 'Vamos a tomar',
                icon: 'beer'
            },
            {
                id: 5,
                name: 'Vamos andar en bicicleta',
                icon: 'bicycle'
            },
            {
                id: 6,
                name: 'Damos una vuelta en mi yate',
                icon: 'boat'
            },
            {
                id: 7,
                name: 'Vamos acampar',
                icon: 'bonfire'
            },
            {
                id: 8,
                name: 'Tomamos una tasa de té',
                icon: 'cafe'
            },
            {
                id: 9,
                name: 'Me llamos por favor',
                icon: 'call'
            },
            {
                id: 10,
                name: 'Unas selfis',
                icon: 'camera'
            },
            {
                id: 11,
                name: 'Veamos television',
                icon: 'desktop'
            },
            {
                id: 12,
                name: 'Vamos al cine',
                icon: 'film'
            },
            {
                id: 13,
                name: 'Jugamos video juegos',
                icon: 'game-controller-b'
            }
        ];
    }
    InvitesJoinPage.prototype.goToInvitesJoin = function (plan) {
        var _this = this;
        this.alertCtrl.create({
            title: "INVITACION",
            message: "¿Seguro que deseas enviar la invitacion de: " + plan.name + " a " + this.contact.username + " ?",
            buttons: [
                {
                    text: 'OTRO DIA'
                }, {
                    text: 'ENVIAR',
                    handler: function () {
                        var loadInvited = _this.loadingCtrl.create({
                            content: "Enviando invitacion..."
                        });
                        loadInvited.present();
                        _this.invitedProvider.sendInviteJoin(_this.contactId, _this.uid, plan).then(function () {
                            loadInvited.dismiss();
                            _this.toast.show("Invitacion enviada ;)", "5000", "bottom").subscribe(function (toast) { });
                        });
                        _this.notificationProvider.sendNotification(_this.contact.token, _this.userUsername, _this.userPhotoURL, 'Te envio una invitacion de: ' + plan.name + '');
                    }
                }
            ]
        }).present();
    };
    InvitesJoinPage.prototype.goSeeInvitesJoin = function () {
        var user = {
            username: this.username,
            photoURL: this.photoURL
        };
        this.navCtrl.push("InvitesJoinSeePage", {
            join: this.contactId,
            user: user,
            uid: this.uid
        }, { animate: true });
    };
    return InvitesJoinPage;
}());
InvitesJoinPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-invites-join',
        templateUrl: 'invites-join.html',
        providers: [
            Toast,
            InvitedProvider,
            NotificationProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        LoadingController,
        Toast,
        Http,
        InvitedProvider,
        NotificationProvider])
], InvitesJoinPage);
export { InvitesJoinPage };
//# sourceMappingURL=invites-join.js.map