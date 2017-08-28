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
var PublicationProvider = (function () {
    function PublicationProvider(http) {
        this.http = http;
    }
    PublicationProvider.prototype.likePublication = function (contactId, publication, uid) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + contactId + '/publications/' + publication.$key + '/likes/' + uid).once('value', function (snap) {
                if (snap.child("like").val()) {
                    if (snap.val().like == 0) {
                        firebase.database().ref('/users/' + contactId + '/publications/' + publication.$key + '/likes/' + uid).update({
                            like: 1
                        }).then(function () {
                            _this.toast.show('Has Indicado que la publicacion te gusta', '5000', 'bottom').subscribe(function (toast) { });
                            resolve(true);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                    else if (snap.val().like == 1) {
                        firebase.database().ref('/users/' + contactId + '/publications/' + publication.$key + '/likes/' + uid).update({
                            like: 0
                        }).then(function () {
                            _this.toast.show('Has indicado que no te gusta esta publicacion', '5000', 'bottom').subscribe(function (toast) { });
                            resolve(true);
                        }).catch(function (err) {
                            reject(err);
                        });
                    }
                }
                else {
                    firebase.database().ref('/users/' + contactId + '/publications/' + publication.$key + '/likes/' + uid).set({
                        like: 1
                    }).then(function () {
                        _this.toast.show('Has Indicado que la publicacion te gusta', '5000', 'bottom').subscribe(function (toast) { });
                        resolve(true);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            });
        });
        return promise;
    };
    return PublicationProvider;
}());
PublicationProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], PublicationProvider);
export { PublicationProvider };
//# sourceMappingURL=publication.js.map