var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Toast } from '@ionic-native/toast';
var PublicationPage = (function () {
    function PublicationPage(navCtrl, camera, dialog, alertCtrl, angularFire, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.dialog = dialog;
        this.alertCtrl = alertCtrl;
        this.angularFire = angularFire;
        this.toast = toast;
        this.userProfile = null;
        this.photoURL = "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png";
        this.username = "Cargando datos...";
        this.txt_publications = "";
        this.img_publications = "";
        this.imgPublications = "";
        this.imagePublications = false;
        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    var user_data = firebase.database().ref('/users/' + JSON.stringify(user.uid));
                    user_data.on('value', function (snap) {
                        if (snap.val() !== null) {
                            _this.userProfile = snap.val();
                            _this.uid = snap.key;
                            _this.photoURL = _this.userProfile.photoURL;
                            _this.username = _this.userProfile.username;
                            _this.getPublications();
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
                }
                else {
                    _this.userProfile = null;
                }
            });
        });
    }
    PublicationPage.prototype.getPublications = function () {
        this.publications = this.angularFire.list('/users/' + this.uid + '/publications/');
    };
    PublicationPage.prototype.btn_openCamera = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.img_publications = 'data:image/jpeg;base64,' + imageData;
            _this.img_publications_imageData = imageData;
            _this.imgPublications = "https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif";
            _this.imgPublications = 'data:image/jpeg;base64,' + imageData;
            _this.imagePublications = true;
        }, function (err) {
        });
    };
    PublicationPage.prototype.btn_openGallery = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.img_publications = 'data:image/jpeg;base64,' + imageData;
            _this.img_publications_imageData = imageData;
            _this.imgPublications = "https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif";
            _this.imgPublications = 'data:image/jpeg;base64,' + imageData;
            _this.imagePublications = true;
        }, function (err) {
        });
    };
    PublicationPage.prototype.goPublicContent = function () {
        var _this = this;
        this.img_publications = "";
        var date = new Date().toISOString();
        if (!this.imagePublications) {
            var dialog = this.dialog.create({
                content: 'Publicando....'
            });
            dialog.present();
            firebase.database().ref('/users/' + this.uid + '/publications/').push({
                content: this.txt_publications,
                image: this.img_publications,
                createdAt: date
            });
            this.txt_publications = "";
            dialog.dismiss();
        }
        else {
            var nameImage = Math.floor(Math.random() * 20);
            var dialog_1 = this.dialog.create({
                content: 'Publicando....'
            });
            dialog_1.present();
            var uploadTask_1 = firebase.storage().ref().child('users/' + this.uid + '/publications/' + nameImage + '.png')
                .putString(this.img_publications_imageData, 'base64', {
                contentType: 'image/png'
            });
            uploadTask_1.on('state_changed', function (snapshot) {
                _this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function (err) {
                dialog_1.dismiss();
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
            }, function () {
                _this.img_publications = uploadTask_1.snapshot.downloadURL;
                firebase.database().ref('/users/' + _this.uid + '/publications/').push({
                    content: _this.txt_publications,
                    name: nameImage,
                    nameUrl: _this.img_publications,
                    createdAt: date
                });
                _this.txt_publications = "";
                _this.imgPublications = "";
                _this.imagePublications = false;
                dialog_1.dismiss();
            });
        }
    };
    PublicationPage.prototype.goCancelContent = function () {
        this.txt_publications = "";
    };
    PublicationPage.prototype.btnDeletePublication = function (publication) {
        var _this = this;
        firebase.database().ref('/users/' + this.uid + '/publications/' + publication.$key).once('value', function (snap) {
            _this.alertCtrl.create({
                title: 'PUBLICACION',
                message: '¿Esta seguro que desea eliminar la publicacion?',
                buttons: [
                    {
                        text: 'CANCELAR',
                        handler: function () {
                            return;
                        }
                    },
                    {
                        text: 'ELIMINAR',
                        handler: function () {
                            firebase.database().ref('/users/' + _this.uid + '/publications/' + publication.$key).remove(function () {
                                _this.toast.show('Publicacion Eliminada.', '5000', 'bottom').subscribe(function (toast) { });
                            });
                        }
                    }
                ]
            }).present();
        });
    };
    PublicationPage.prototype.goProfile = function () {
        this.navCtrl.push("ProfilePage", { uid: this.uid }, { animate: false });
    };
    PublicationPage.prototype.btn_openPosition = function () {
    };
    return PublicationPage;
}());
PublicationPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-publication',
        templateUrl: 'publication.html',
        providers: [Camera, AngularFireDatabase, Toast]
    }),
    __metadata("design:paramtypes", [NavController,
        Camera,
        LoadingController,
        AlertController,
        AngularFireDatabase,
        Toast])
], PublicationPage);
export { PublicationPage };
//# sourceMappingURL=publication.js.map