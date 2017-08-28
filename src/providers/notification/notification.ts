import { Injectable } from '@angular/core';
import { 
  Http, 
  Headers, 
  RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NotificationProvider {

  constructor(public http: Http) {
    console.log('Hello NotificationProvider Provider');
  }

  sendNotification(token, username, photoURL, message) {
  	var promise = new Promise((resolve, reject) => {
  		let body = JSON.stringify({
        'tokens': token,
        'profile': 'nicfire_development',
        'notification': {
          "android": {
            'title': username,
            'image': photoURL,
            'sound': 'default',
            'message': ''+ message +''
          }
        }
      })
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZmYxMWM5Ny1jMmZhLTQxODMtOTg1NC00ZjU3MzQyNGViYjAifQ.tdpQPmVgcuJCu_4ihjaJYGY57mjlR97OcdT8gNv0IM0'
      })
      let options = new RequestOptions({ headers: headers});
      this.http.post('https://api.ionic.io/push/notifications/',body,options).subscribe(res => {}, err => {}, () => {}) 
  	})
  	return promise
  }

}
