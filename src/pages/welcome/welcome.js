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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams, loading) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.userProfile = null;
        this.txt_password = "";
        this.txt_email = "";
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var load = this.loading.create({
            content: "Por espera..."
        });
        load.present();
        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    load.dismiss();
                    _this.navCtrl.setRoot("TabsPage", {}, { animate: false });
                }
                else {
                    load.dismiss();
                }
            });
        });
    };
    WelcomePage.prototype.loginSimple = function () {
        var _this = this;
        var load = this.loading.create({
            content: "Por espera..."
        });
        load.present();
        firebase.auth().signInWithEmailAndPassword(this.txt_email, this.txt_password)
            .then(function () {
            load.dismiss();
            _this.navCtrl.setRoot("TabsPage", {}, { animate: false });
        }).catch(function (err) {
            load.dismiss();
            alert("Falla :/... firebase" + err);
        });
    };
    WelcomePage.prototype.login = function () {
    };
    WelcomePage.prototype.logout = function () {
        this.navCtrl.push("LogoutPage", {}, { animate: false });
    };
    return WelcomePage;
}());
WelcomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-welcome',
        templateUrl: 'welcome.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController])
], WelcomePage);
export { WelcomePage };
//# sourceMappingURL=welcome.js.map