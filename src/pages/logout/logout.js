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
import { IonicPage, Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
var LogoutPage = (function () {
    function LogoutPage(navCtrl, navParams, loading, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.platform = platform;
        this.txt_username = "";
        this.txt_email = "";
        this.txt_password = "";
    }
    LogoutPage.prototype.create = function () {
        var _this = this;
        var load = this.loading.create({
            content: "Por favor espere..."
        });
        load.present();
        firebase.auth().createUserWithEmailAndPassword(this.txt_email, this.txt_password)
            .then(function (success) {
            _this.date = new Date().toISOString();
            _this.coords = {
                latitude: 1.847071,
                longitude: -76.047399
            };
            firebase.database().ref('/users/' + JSON.stringify(success.uid)).set({
                email: _this.txt_email,
                username: _this.txt_username,
                photoURL: "assets/img/user/user.png",
                position: _this.coords,
                createAt: _this.date,
                token: ""
            }).then(function (snap) {
                load.dismiss();
                _this.navCtrl.setRoot("LogoutimagePage", {
                    uid: JSON.stringify(success.uid)
                }, { animate: false });
            }).catch(function (err) {
                load.dismiss();
                alert("error al crear la cuenta" + err);
            });
        }).catch(function (err) {
            load.dismiss();
            var errorCode = err.stack;
            var errorMessage = err.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set..');
            }
            else if (errorCode === 'auth/invalid-email') {
                alert('Thrown if the email address is not valid.');
            }
            else if (errorCode === 'auth/user-disabled') {
                alert('Thrown if the user corresponding to the given email has been disabled. .');
            }
            else if (errorCode === 'auth/user-not-found') {
                alert('Thrown if there is no user corresponding to the given email.');
            }
            else {
                alert(errorMessage);
            }
        });
    };
    return LogoutPage;
}());
LogoutPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-logout',
        templateUrl: 'logout.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        Platform])
], LogoutPage);
export { LogoutPage };
//# sourceMappingURL=logout.js.map