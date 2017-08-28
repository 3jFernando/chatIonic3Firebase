var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
var UserProvider = (function () {
    function UserProvider(http) {
        this.http = http;
    }
    UserProvider.prototype.updateData = function (uid, txt_username, txt_email) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid).update({
                username: txt_username,
                email: txt_email
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updatePhoto = function (uid, photo) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid).update({
                photoURL: photo
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    UserProvider.prototype.updatePosition = function (uid, coords) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid).update({
                position: coords
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserProvider);
export { UserProvider };
//# sourceMappingURL=user.js.map