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
import { AngularFireDatabase } from 'angularfire2/database';
//providers data
import { InvitedProvider } from '../../providers/invited/invited';
var InvitesJoinSeePage = (function () {
    function InvitesJoinSeePage(navCtrl, navParams, angularFire, alertCtrl, loadginCtrl, invitedProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularFire = angularFire;
        this.alertCtrl = alertCtrl;
        this.loadginCtrl = loadginCtrl;
        this.invitedProvider = invitedProvider;
        this.uid = this.navParams.data.uid;
        this.join = this.navParams.data.join;
        this.user = this.navParams.data.user;
        this.loadInvitesJoin(this.join, this.user);
    }
    InvitesJoinSeePage.prototype.loadInvitesJoin = function (join, user) {
        this.invitesjoin = this.angularFire.list('/users/' + this.uid + '/invitesJoinsPlan/recived/' + this.join);
        this.invitesjoinContat = this.angularFire.list('/users/' + this.join + '/invitesJoinsPlan/recived/' + this.uid);
    };
    InvitesJoinSeePage.prototype.btnGoUpdateStateInvitedJoin = function (invited) {
        this.invitedProvider.updateStateInvitedJoin(this.uid, this.join, invited).then(function () { });
    };
    InvitesJoinSeePage.prototype.goToDeleteInvitedJoin = function (key) {
        var _this = this;
        this.alertCtrl.create({
            title: 'ELIMINAR',
            message: '¿Seguro que deseas eliminar la invitacion, si la eliminas tu contacto dejara de verla?',
            buttons: [
                {
                    text: 'NO',
                },
                {
                    text: 'SI',
                    handler: function () {
                        var loadRemoving = _this.loadginCtrl.create({
                            content: "Eliminando..."
                        });
                        loadRemoving.present();
                        _this.invitedProvider.deleteInvitedJoin(_this.join, _this.uid, key);
                        loadRemoving.dismiss();
                    }
                }
            ]
        }).present();
    };
    return InvitesJoinSeePage;
}());
InvitesJoinSeePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-invites-join-see',
        templateUrl: 'invites-join-see.html',
        providers: [
            AngularFireDatabase,
            InvitedProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AngularFireDatabase,
        AlertController,
        LoadingController,
        InvitedProvider])
], InvitesJoinSeePage);
export { InvitesJoinSeePage };
//# sourceMappingURL=invites-join-see.js.map