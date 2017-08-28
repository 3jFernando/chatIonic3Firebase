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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic/cloud-angular';
import firebase from 'firebase';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, push) {
        var _this = this;
        this.push = push;
        this.rootPage = "WelcomePage";
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.zone = new NgZone({});
            firebase.auth().onAuthStateChanged(function (user) {
                _this.zone.run(function () {
                    if (user !== null) {
                        _this.registerToken(JSON.stringify(user.uid));
                    }
                    else {
                    }
                });
            });
        });
    }
    MyApp.prototype.registerToken = function (uid) {
        var _this = this;
        this.push.register().then(function (t) {
            return _this.push.saveToken(t, {
                ignore_user: true
            });
        }).then(function (t) {
            console.log("token: " + t.token);
            firebase.database().ref('/users/' + uid).update({
                token: t.token
            });
        }).catch(function (err) {
            console.log("No se pudo obtener el token");
        });
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        Push])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map