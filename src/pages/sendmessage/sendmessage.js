var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
//providers data
import { MessageProvider } from '../../providers/message/message';
import { NotificationProvider } from '../../providers/notification/notification';
var SendmessagePage = (function () {
    function SendmessagePage(navCtrl, navParams, zone, angularFire, toast, alertCtrl, actionSheetCtrl, camera, loadingCtrl, messageProvider, notificationProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.zone = zone;
        this.angularFire = angularFire;
        this.toast = toast;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.messageProvider = messageProvider;
        this.notificationProvider = notificationProvider;
        this.contactId = "";
        this.txt_message = "";
        this.username = "Cargando datos...";
        this.email = "";
        this.photoURL = "assets/img/logo.png";
        //datos user params
        this.uid = "";
        this.usernameUser = "";
        this.photoURLUser = "";
        this.imageLoadPhotoMessage = "";
        this.progressLoadPhotoMessage = 0;
        this.chat = "";
        this.sendingLoadingMessaje = "";
        //emogis
        this.listEmogisfeliz = new Array;
        this.listEmogiscoqueto = new Array;
        this.listEmogissorprendido = new Array;
        this.listEmogistriste = new Array;
        this.listEmogisenojado = new Array;
        this.listEmogisvipolaridad = new Array;
        this.uid = navParams.data.uid;
        this.usernameUser = navParams.data.username;
        this.photoURLUser = navParams.data.photoURL;
        this.contactId = navParams.data.contactId;
        this.chat = 'messages';
        this.sendingLoadingMessaje = "";
        this.imageLoadPhotoMessage = "assets/img/loading.gif";
        this.zone = new NgZone({});
        this.zone.run(function () {
            firebase.database().ref('/users/' + _this.contactId).on('value', function (snap) {
                if (snap.val() !== null) {
                    _this.contactProfile = snap.val();
                    _this.photoURL = _this.contactProfile.photoURL;
                    _this.username = _this.contactProfile.username;
                    _this.email = _this.contactProfile.email;
                    _this.tokenContact = _this.contactProfile.token;
                }
                else {
                    alert("no existe, debe iniciar sesion nuevamente");
                    firebase.auth().signOut().then(function () {
                        _this.navCtrl.popToRoot();
                    }).catch(function (err) {
                        alert("Falla :/... debe iniciar sesion nuevamente " + err);
                    });
                }
            });
        });
    }
    SendmessagePage.prototype.toScroll = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    SendmessagePage.prototype.ionViewDidEnter = function () {
        this.messages = this.angularFire.list('/users/' + this.uid + '/chats/' + this.contactId);
        this.toScroll();
        this.loadEmogis();
    };
    //start emogis
    SendmessagePage.prototype.loadEmogis = function () {
        this.listEmogisfeliz = [];
        this.listEmogiscoqueto = [];
        this.listEmogissorprendido = [];
        this.listEmogistriste = [];
        this.listEmogisenojado = [];
        this.listEmogisvipolaridad = [];
        this.loadfeliz();
        this.loadcoqueto();
        this.loadsorprendido();
        this.loadtriste();
        this.loadenojado();
        this.loadvipolaridad();
    };
    SendmessagePage.prototype.loadfeliz = function () {
        var path = "assets/img/emogis/feliz/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogisfeliz.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.loadcoqueto = function () {
        var path = "assets/img/emogis/coqueto/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogiscoqueto.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.loadsorprendido = function () {
        var path = "assets/img/emogis/sorprendido/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogissorprendido.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.loadtriste = function () {
        var path = "assets/img/emogis/triste/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogistriste.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.loadenojado = function () {
        var path = "assets/img/emogis/enojado/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogisenojado.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.loadvipolaridad = function () {
        var path = "assets/img/emogis/vipolaridad/";
        var ext = ".png";
        for (var i = 1; i <= 8; i++) {
            this.listEmogisvipolaridad.push({
                src: path + i + ext
            });
        }
    };
    SendmessagePage.prototype.clickEmogi = function (emogisrc) {
        var tipeMessage = "emogi";
        this.saveMessages(tipeMessage, emogisrc);
        this.chat = 'messages';
    };
    //end emogis
    SendmessagePage.prototype.sendMessage = function () {
        var tipeMessage = "text";
        if (this.txt_message.length >= 1) {
            this.saveMessages(tipeMessage, this.txt_message);
        }
        else {
            this.toast.show("No puedes enviar campos vacios", '5000', 'top').subscribe(function (toast) { });
        }
    };
    SendmessagePage.prototype.saveMessages = function (tipeMessage, message) {
        var _this = this;
        this.messageProvider.saveMessages(tipeMessage, message, this.contactId, this.uid).then(function () {
            _this.txt_message = "";
            _this.content.scrollToBottom();
        });
        this.messageProvider.saveLastMessages(tipeMessage, message, this.contactId, this.uid).then(function () {
            _this.notificationProvider.sendNotification(_this.tokenContact, _this.usernameUser, _this.photoURLUser, message);
        });
    };
    SendmessagePage.prototype.optionsMessage = function (key, text) {
        var _this = this;
        this.alertCtrl.create()
            .setTitle('MENSAJE')
            .setMessage('Por favor elige una opcion!')
            .addInput({
            type: 'radio',
            label: 'Compartir Mensaje',
            value: 'share_message',
            checked: true
        })
            .addInput({
            type: 'radio',
            label: 'Eliminar Mensaje',
            value: 'delete_message',
            checked: false
        })
            .addButton('CANCELAR')
            .addButton({
            text: 'ACEPTAR',
            handler: function (item) {
                if (item === 'share_message') {
                    _this.shareMessage();
                }
                else if (item === 'delete_message') {
                    _this.removeMessage(key);
                }
            }
        }).present();
    };
    SendmessagePage.prototype.shareMessage = function () {
    };
    SendmessagePage.prototype.removeMessage = function (key) {
        var _this = this;
        this.alertCtrl.create({
            title: 'ELIMINAR!',
            message: '¿Esta seguro que desea eliminar el mensaje, recuerda que no podras recuperarlo; ademas ' + this.username + ' podra seguir viendolo?',
            buttons: [
                {
                    text: 'CANCELAR',
                    handler: function () { }
                }, {
                    text: 'ELIMINAR',
                    handler: function () {
                        _this.messageProvider.removeMessage(_this.uid, _this.contactId, key).then(function () {
                            _this.toast.show("Mensaje Eliminado", "5000", "bottom").subscribe(function (toast) { });
                        });
                    }
                }
            ]
        }).present();
    };
    SendmessagePage.prototype.addFileImage = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            title: 'ENVIAR UNA FOTOGRAFIA!',
            buttons: [
                {
                    text: 'Desde la Galeria',
                    handler: function () {
                        _this.openGallery();
                    }
                }, {
                    text: 'Desde la Camara',
                    handler: function () {
                        _this.openCamera();
                    }
                }, {
                    text: 'CANCELAR',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        }).present();
    };
    SendmessagePage.prototype.openGallery = function () {
        var _this = this;
        var tipeMessage = "image";
        var nameImage = Math.floor(Math.random() * 1000);
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.sendingLoadingMessaje = _this.imageLoadPhotoMessage;
            _this.content.scrollToBottom();
            var uploadTask = firebase.storage().ref().child('users/' + _this.uid + '/chats/images/' + nameImage + '.png')
                .putString(imageData, 'base64', {
                contentType: 'image/png'
            });
            uploadTask.on('state_changed', function (snapshot) {
                _this.progressLoadPhotoMessage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function (err) {
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
            }, function () {
                _this.saveMessages(tipeMessage, uploadTask.snapshot.downloadURL);
                _this.sendingLoadingMessaje = "";
                _this.progressLoadPhotoMessage = 0;
            });
        }, function (err) {
        });
    };
    SendmessagePage.prototype.openCamera = function () {
        var _this = this;
        var tipeMessage = "image";
        var nameImage = Math.floor(Math.random() * 1000);
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.sendingLoadingMessaje = _this.imageLoadPhotoMessage;
            _this.content.scrollToBottom();
            var uploadTask = firebase.storage().ref().child('users/' + _this.uid + '/chats/images/' + nameImage + '.png')
                .putString(imageData, 'base64', {
                contentType: 'image/png'
            });
            uploadTask.on('state_changed', function (snapshot) {
                _this.progressLoadPhotoMessage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function (err) {
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
            }, function () {
                _this.saveMessages(tipeMessage, uploadTask.snapshot.downloadURL);
                _this.sendingLoadingMessaje = "";
                _this.progressLoadPhotoMessage = 0;
            });
        }, function (err) {
        });
    };
    SendmessagePage.prototype.goProfileContact = function () {
        this.navCtrl.push("ProfileContactPage", {
            dataContactId: this.contactId,
            uid: this.uid
        }, { animate: false });
    };
    SendmessagePage.prototype.goInvitesJoin = function () {
        this.navCtrl.push("InvitesJoinPage", {
            uid: this.uid,
            userUsername: this.usernameUser,
            userPhotoURL: this.photoURLUser,
            contactId: this.contactId,
            contact: this.contactProfile,
            username: this.username,
            photoURL: this.photoURL,
        }, { animate: true });
    };
    return SendmessagePage;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], SendmessagePage.prototype, "content", void 0);
SendmessagePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-sendmessage',
        templateUrl: 'sendmessage.html',
        providers: [
            AngularFireDatabase,
            Toast,
            Camera,
            MessageProvider,
            NotificationProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        NgZone,
        AngularFireDatabase,
        Toast,
        AlertController,
        ActionSheetController,
        Camera,
        LoadingController,
        MessageProvider,
        NotificationProvider])
], SendmessagePage);
export { SendmessagePage };
//# sourceMappingURL=sendmessage.js.map