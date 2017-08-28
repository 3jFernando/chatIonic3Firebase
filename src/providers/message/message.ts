import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase'

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessageProvider {

  constructor(public http: Http) {
    
  }

  saveMessages(tipeMessage, message, contactId, uid) {

  	let date: String = new Date().toISOString()

  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid + '/chats/' + contactId + '/').push({
        senderID: uid,
        text: message,
        tipe: tipeMessage,
        createdAt: date
      }).then(() => {
      	firebase.database().ref('/users/' + contactId + '/chats/' + uid + '/').push({
	        senderID: uid,
	        text: message,
	        tipe: tipeMessage,
	        createdAt: date
	      }).then(() => {
	      	resolve(true)
	      }).catch((err) => {
	      	reject(err)
	      })
      })
  	})
  	return promise
  }

  saveLastMessages(tipeMessage, message, contactId, uid) {

  	let date: String = new Date().toISOString()

  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/'+contactId+'/contacts/'+uid).update({
        lastMessage: message,
        dateLastMessage: date,
        tipe: tipeMessage,
        owner: 'you'
      }).then(() => {
      	firebase.database().ref('/users/'+uid+'/contacts/'+contactId).update({
	        lastMessage: message,
	        dateLastMessage: date,
	        tipe: tipeMessage,
	        owner: 'i'
	      }).then(() => {
		     	resolve(true)
		    }).catch((err) => {
		    	reject(err)
		    })
      })
  	})	
  	return promise
  }

  removeMessage(uid, contactId, key) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/'+uid+'/chats/'+contactId+'/'+key).remove().then(() => {
	     	resolve(true)
	    }).catch((err) => {
	    	reject(err)
	    })
  	})
  	return promise
  }

}
