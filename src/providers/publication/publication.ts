import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase'

@Injectable()
export class PublicationProvider {

  constructor(public http: Http) {
    
  }

  savePublication(uid, txt_publications, img_publications) {
		
		let date: String = new Date().toISOString()

  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid + '/publications/').push({          
          content: txt_publications,
          image: img_publications,
          createdAt: date
    	}).then(() => {
    		resolve(true)
    	}).catch(err => {
    		reject(err)
    	})
  	})
  	return promise
  }

  savePublicationImage(uid, txt_publications, img_publications, nameImage) {
		
		let date: String = new Date().toISOString()

  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + uid + '/publications/').push({          
	      content: txt_publications,
	      name: nameImage,
	    	nameUrl: img_publications,
	      createdAt: date
	   	}).then(() => {
    		resolve(true)
    	}).catch(err => {
    		reject(err)
    	})
  	})
  	return promise
  }

  deletePublication(uid, publication) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/'+uid+'/publications/'+publication.$key).remove()
  		.then(() => {
  			resolve(true)
    	}).catch(err => {
    		reject(err)
    	})
  	})
  	return promise
  }

  likePublication(contactId, publication, uid) {
  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/'+contactId+'/publications/'+publication.$key+'/likes/'+uid).once('value', snap => {
	      if(snap.child("like").val()) {
	        if(snap.val().like == 0) {
	            firebase.database().ref('/users/'+contactId+'/publications/'+publication.$key+'/likes/'+uid).update({
	              like: 1
	            }).then(() => {
			        	resolve(true)
			        }).catch(err => {
			        	reject(err)
			        })
	          } else if(snap.val().like == 1) {
	            firebase.database().ref('/users/'+contactId+'/publications/'+publication.$key+'/likes/'+uid).update({
	              like: 0
			        }).then(() => {
			        	resolve(true)
			        }).catch(err => {
			        	reject(err)
			        })
	          }
	      } else {
	        firebase.database().ref('/users/'+contactId+'/publications/'+publication.$key+'/likes/'+uid).set({
	            like: 1
	        }).then(() => {
	        	resolve(true)
	        }).catch(err => {
	        	reject(err)
	        })
	      }  
	    })
  	})
  	return promise
  }

}
