var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
var LogoutimagePage = (function () {
    function LogoutimagePage(navCtrl, navParams, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.img_logo_user = "assets/icon/favicon.ico";
        this.uid = navParams.data.uid;
    }
    LogoutimagePage.prototype.image = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
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
                var url = uploadTask.snapshot.downloadURL;
                firebase.database().ref('/users/' + _this.uid).update({
                    photoURL: url
                });
                _this.navCtrl.setRoot("TabsPage", {}, { animate: false });
            });
        }, function (err) {
        });
    };
    LogoutimagePage.prototype.btnOpenCamera = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
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
                var url = uploadTask.snapshot.downloadURL;
                firebase.database().ref('/users/' + _this.uid).update({
                    photoURL: url
                });
                _this.navCtrl.setRoot("TabsPage", {}, { animate: false });
            });
        }, function (err) {
        });
    };
    LogoutimagePage.prototype.save = function () {
        this.navCtrl.setRoot("TabsPage", {}, { animate: false });
    };
    return LogoutimagePage;
}());
LogoutimagePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-logoutimage',
        templateUrl: 'logoutimage.html',
        providers: [Camera]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Camera])
], LogoutimagePage);
export { LogoutimagePage };
//# sourceMappingURL=logoutimage.js.map