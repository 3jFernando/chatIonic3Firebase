import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase'

@Injectable()
export class InvitedProvider {

  constructor(public http: Http) {
    
  }

  sendInvited(uid, contactId) {

  	let date: String = new Date().toISOString()

  	var promise = new Promise((resolve, reject) => {
  		firebase.database().ref('/users/' + contactId + '/inviteds/' + uid).set({
        contactId: uid,              
        createAt: date
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
  	})
  	return promise
  }

  deleteInvited(uid, userKey) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/'+uid+'/inviteds/'+userKey).remove()
      .then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })  
    })
    return promise
  }

  aceptedinvited(uid, userKey) {

    let date: String = new Date().toISOString()

    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + uid + '/contacts/'+userKey).set({              
          contactId: userKey,                          
          createAt: date
      }).then(() => {
          
        firebase.database().ref('/users/' + userKey + '/contacts/'+uid).set({              
          contactId: uid,                        
          createAt: date
        }).then(() => {
          firebase.database().ref('/users/'+uid+'/inviteds/'+userKey).remove().then(() => {
            resolve(true)
          }).catch((err) => {
            reject(err)
          })
        })    

      })        
    })
    return promise
  }

  sendInviteJoin(contactId, uid, plan) {

    let date: String = new Date().toISOString()

    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + contactId + '/invitesJoinsPlan/recived/'+uid+'/').push({              
        contactId: uid,
        name: plan.name,
        icon: plan.icon,
        date: date,
        state: 0                        
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
    return promise
  }

  updateStateInvitedJoin(uid, join, invited) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/'+join+'/'+invited.$key).once('value', snap => {
        if(snap.val().state == 0) {
          firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/'+join+'/'+invited.$key).update({
            state: 1
          })
        } else if(snap.val().state == 1) {
          firebase.database().ref('/users/' + uid + '/invitesJoinsPlan/recived/'+join+'/'+invited.$key).update({
            state: 0
          })
        }
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
    return promise
  }

  deleteInvitedJoin(join, uid, key) {
    var promise = new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + join + '/invitesJoinsPlan/recived/'+uid+'/'+key).remove().then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })  
    })
    return promise
  }

}
