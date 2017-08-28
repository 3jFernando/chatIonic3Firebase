import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase'

@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    
  }

  updateData(uid, txt_username, txt_email) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid).update({
        username: txt_username,
        email: txt_email
      }).then(() => {
      	resolve(true)
      }).catch(err => {
      	reject(err)
      }) 
  	})
  	return promise
  }

  updatePhoto(uid, photo) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid).update({
        photoURL: photo
      }).then(() => {
      	resolve(true)
      }).catch(err => {
      	reject(err)
      }) 
  	})
  	return promise
  }

  updatePosition(uid, coords) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid).update({
        position: coords
      }).then(() => {
      	resolve(true)
      }).catch(err => {
      	reject(err)
      }) 
  	})
  	return promise
  }

}
