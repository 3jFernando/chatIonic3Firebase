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
var InvitedProvider = (function () {
    function InvitedProvider(http) {
        this.http = http;
    }
    InvitedProvider.prototype.sendInvited = function (uid, contactId) {
        var date = new Date().toISOString();
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + contactId + '/inviteds/' + uid).set({
                contactId: uid,
                createAt: date
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    InvitedProvider.prototype.sendInviteJoin = function (contactId, uid, plan) {
        var date = new Date().toISOString();
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + contactId + '/invitesJoinsPlan/recived/' + uid + '/').push({
                contactId: uid,
                name: plan.name,
                icon: plan.icon,
                date: date,
                state: 0
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    InvitedProvider.prototype.updateStateInvitedJoin = function (uid, join, invited) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/' + join + '/' + invited.$key).once('value', function (snap) {
                if (snap.val().state == 0) {
                    firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/' + join + '/' + invited.$key).update({
                        state: 1
                    });
                }
                else if (snap.val().state == 1) {
                    firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/' + join + '/' + invited.$key).update({
                        state: 0
                    });
                }
            }).then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    InvitedProvider.prototype.deleteInvitedJoin = function (join, uid, key) {
        var promise = new Promise(function (resolve, reject) {
            firebase.database().ref('/users/' + join + '/invitesJoinsPlan/recived/' + uid + '/' + key).remove().then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    return InvitedProvider;
}());
InvitedProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], InvitedProvider);
export { InvitedProvider };
//# sourceMappingURL=invited.js.map