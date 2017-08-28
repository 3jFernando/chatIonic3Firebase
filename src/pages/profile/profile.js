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
import { IonicPage, NavController, LoadingController, App, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { Diagnostic } from '@ionic-native/diagnostic';
//providers data
import { UserProvider } from '../../providers/user/user';
var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, loading, app, camera, params, alertCtrl, geolocation, toast, angularFire, diagnostic, userProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.app = app;
        this.camera = camera;
        this.params = params;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.toast = toast;
        this.angularFire = angularFire;
        this.diagnostic = diagnostic;
        this.userProvider = userProvider;
        //data user
        this.txt_email = "Cargando datos...";
        this.txt_username = "Cargando datos...";
        this.img_logo_user = 'assets/img/loading.gif';
        this.uid = this.navParams.data.uid;
        this.zone = new NgZone({});
        this.zone.run(function () {
            firebase.database().ref('/users/' + _this.uid).on('value', function (snap) {
                if (snap.val() !== null) {
                    _this.uid = snap.key;
                    _this.txt_email = snap.val().email;
                    _this.txt_username = snap.val().username;
                    _this.img_logo_user = snap.val().photoURL;
                    _this.location_latitude = snap.val().position.latitude;
                    _this.location_longitude = snap.val().position.longitude;
                    _this.nametitle = snap.val().username;
                    _this.getDataUser();
                }
            });
        });
    }
    ProfilePage.prototype.getDataUser = function () {
        var _this = this;
        this.angularFire.list('/users/' + this.uid + '/publications/').forEach(function (item) {
            _this.countPublications = item.length;
        });
        this.angularFire.list('/users/' + this.uid + '/contacts/').forEach(function (item) {
            _this.countContacts = item.length;
        });
    };
    ProfilePage.prototype.save = function () {
        var _this = this;
        if (this.txt_email !== null && this.txt_username !== null) {
            this.userProvider.updateData(this.uid, this.txt_username, this.txt_email).then(function () {
                _this.toast.show('Datas actualizados exitosamente...', '5000', 'bottom').subscribe(function (toast) { });
            }).catch(function (err) {
                _this.toast.show('Error al tratar de actualizar los datos del usuario', '5000', 'bottom').subscribe(function (toast) { });
            });
        }
        else {
            alert("El correo electronico y tu nombre no pueden estar vacios");
        }
    };
    ProfilePage.prototype.image = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            targetWidth: 310,
            targetHeight: 310
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var uploadTask = firebase.storage().ref().child('photoPerfilUser/' + _this.uid + '.jpeg')
                .putString(imageData, 'base64', {
                contentType: 'image/png'
            });
            uploadTask.on('state_changed', function (snapshot) {
                _this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif';
                _this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function (err) {
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
            }, function () {
                _this.img_logo_user = base64Image;
                _this.userProvider.updatePhoto(_this.uid, uploadTask.snapshot.downloadURL);
            });
        }, function (err) { });
    };
    ProfilePage.prototype.btnOpenCamera = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            targetWidth: 310,
            targetHeight: 310
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            var uploadTask = firebase.storage().ref().child('photoPerfilUser/' + _this.uid + '.jpeg')
                .putString(imageData, 'base64', {
                contentType: 'image/png'
            });
            uploadTask.on('state_changed', function (snapshot) {
                _this.img_logo_user = 'https://image.jimcdn.com/app/cms/image/transf/none/path/s67ca73bff5137706/image/i3ea5d01f3bf39f2e/version/1297299231/image.gif';
                _this.progressLoadPhotoChange = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, function (err) {
                alert('Upps!, parece que ocurrio un error al tratar de subir la potografia, por favor revisa tu conexion a internet e intentalo de nuevo; si el error persiste por favor intentalo mas tarde');
            }, function () {
                _this.img_logo_user = base64Image;
                _this.userProvider.updatePhoto(_this.uid, uploadTask.snapshot.downloadURL);
            });
        }, function (err) { });
    };
    ProfilePage.prototype.updatePosition = function () {
        this.confirmUpdatePosition();
    };
    ProfilePage.prototype.confirmUpdatePosition = function () {
        var _this = this;
        //locactions authorization true  
        this.diagnostic.isLocationAuthorized()
            .then(function (isAvailable) {
            if (isAvailable == true) {
                //locations enabled false
                _this.diagnostic.isLocationEnabled()
                    .then(function (isAvailable) {
                    if (isAvailable == true) {
                        _this.alertCtrl.create({
                            title: 'NUEVA UBICACION!',
                            message: '¿Esta seguro que desea actualizar su ubicacion?',
                            buttons: [
                                {
                                    text: 'CANCELAR'
                                },
                                {
                                    text: 'ACTUALIZAR',
                                    handler: function () {
                                        var loadingPosition = _this.loading.create({
                                            content: "Obteniedo la nueva ubicacion..."
                                        });
                                        loadingPosition.present();
                                        _this.geolocation.getCurrentPosition().then(function (resp) {
                                            _this.location_latitude = resp.coords.latitude;
                                            _this.location_longitude = resp.coords.longitude;
                                            var coords = {
                                                latitude: _this.location_latitude,
                                                longitude: _this.location_longitude
                                            };
                                            _this.userProvider.updatePosition(_this.uid, coords).then(function () {
                                                loadingPosition.dismiss();
                                            }).catch(function (err) {
                                                alert("Error al tratar de actualizar la localizacion" + err);
                                            });
                                        }).catch(function (err) {
                                            loadingPosition.dismiss();
                                            alert("Error al obtener la nueva posicion, " + err);
                                        });
                                    }
                                }
                            ]
                        }).present();
                    }
                    else {
                        _this.diagnostic.switchToLocationSettings();
                        _this.toast.show("Activa la localizacion del dispositivo", '5000', 'bottom').subscribe(function (toast) { });
                    }
                }).catch(function (e) {
                    alert("error" + e);
                });
            }
            else {
                _this.toast.show("La aplicacion necesita permisos para utilizar la localizacion", '5000', 'bottom').subscribe(function (toast) { });
            }
        }).catch(function (e) {
            alert("error" + e);
        });
    };
    ProfilePage.prototype.close_section = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'CERRAR SESION',
            message: "¿Esta seguro que desea cerrar su sesion?",
            buttons: [
                { text: 'QUEDARME', handler: function () { } },
                {
                    text: "VOLVERE",
                    handler: function () {
                        var load = _this.loading.create({
                            content: "Saliendo... Recuerda volver ;)"
                        });
                        load.present();
                        firebase.auth().signOut().then(function () {
                            load.dismiss();
                            _this.navCtrl.setRoot("WelcomePage", {}, { animate: false });
                        }).catch(function (err) {
                            load.dismiss();
                            alert("Falla :/... firebase close section: " + err);
                        });
                    }
                }
            ]
        }).present();
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html',
        providers: [
            Camera,
            Geolocation,
            Toast,
            AngularFireDatabase,
            Diagnostic,
            UserProvider
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        App,
        Camera,
        NavParams,
        AlertController,
        Geolocation,
        Toast,
        AngularFireDatabase,
        Diagnostic,
        UserProvider])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map