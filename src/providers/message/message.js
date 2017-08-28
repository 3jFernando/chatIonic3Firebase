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
/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var MessageProvider = (function () {
    function MessageProvider(http) {
        this.http = http;
    }
    MessageProvider.prototype.saveMessages = function (tipeMessage, message, contactId, uid) {
        var date = new Date().toISOString();
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid + '/chats/' + contactId + '/').push({
                senderID: uid,
                text: message,
                tipe: tipeMessage,
                createdAt: date
            }).then(function () {
                firebase.database().ref('/users/' + contactId + '/chats/' + uid + '/').push({
                    senderID: uid,
                    text: message,
                    tipe: tipeMessage,
                    createdAt: date
                }).then(function () {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
        return promise;
    };
    MessageProvider.prototype.saveLastMessages = function (tipeMessage, message, contactId, uid) {
        var date = new Date().toISOString();
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + contactId + '/contacts/' + uid).update({
                lastMessage: message,
                dateLastMessage: date,
                tipe: tipeMessage,
                owner: 'you'
            }).then(function () {
                firebase.database().ref('/users/' + uid + '/contacts/' + contactId).update({
                    lastMessage: message,
                    dateLastMessage: date,
                    tipe: tipeMessage,
                    owner: 'i'
                }).then(function () {
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
        return promise;
    };
    MessageProvider.prototype.removeMessage = function (uid, contactId, key) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid + '/chats/' + contactId + '/' + key).remove().then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    return MessageProvider;
}());
MessageProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], MessageProvider);
export { MessageProvider };
//# sourceMappingURL=message.js.map