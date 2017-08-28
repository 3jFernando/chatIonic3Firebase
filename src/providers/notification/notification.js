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
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var NotificationProvider = (function () {
    function NotificationProvider(http) {
        this.http = http;
        console.log('Hello NotificationProvider Provider');
    }
    NotificationProvider.prototype.sendNotification = function (token, username, photoURL, message) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var body = JSON.stringify({
                'tokens': token,
                'profile': 'nicfire_development',
                'notification': {
                    "android": {
                        'title': username,
                        'image': photoURL,
                        'sound': 'default',
                        'message': '' + message + ''
                    }
                }
            });
            var headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZmYxMWM5Ny1jMmZhLTQxODMtOTg1NC00ZjU3MzQyNGViYjAifQ.tdpQPmVgcuJCu_4ihjaJYGY57mjlR97OcdT8gNv0IM0'
            });
            var options = new RequestOptions({ headers: headers });
            _this.http.post('https://api.ionic.io/push/notifications/', body, options).subscribe(function (res) { }, function (err) { }, function () { });
        });
        return promise;
    };
    return NotificationProvider;
}());
NotificationProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], NotificationProvider);
export { NotificationProvider };
//# sourceMappingURL=notification.js.map