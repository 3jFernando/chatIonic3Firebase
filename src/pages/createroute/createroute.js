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
import { IonicPage, NavController, AlertController, ActionSheetController, NavParams } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var CreateroutePage = (function () {
    function CreateroutePage(navCtrl, angularFire, zone, alertCtrl, actionSheetCtrl, params, diagnostic, toast) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.angularFire = angularFire;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.params = params;
        this.diagnostic = diagnostic;
        this.toast = toast;
        this.zone = new NgZone({});
        firebase.auth().onAuthStateChanged(function (user) {
            _this.zone.run(function () {
                if (user) {
                    firebase.database().ref('/users/' + JSON.stringify(user.uid)).on('value', function (snap) {
                        if (snap.val() !== null) {
                            _this.uid = snap.key;
                        }
                    });
                }
            });
        });
    }
    CreateroutePage.prototype.ionViewDidEnter = function () {
        this.loadUsers();
        this.loadContacts();
    };
    CreateroutePage.prototype.loadUsers = function () {
        this.users = this.angularFire.list('/users/');
    };
    CreateroutePage.prototype.loadContacts = function () {
        this.contacts = this.angularFire.list('/users/' + this.uid + '/contacts/');
    };
    CreateroutePage.prototype.createRoute = function (lat, lng) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('GENERAR RUTA');
        alert.setMessage('¿Esta seguro que desea generar la ruta con el usuario seleccionado?');
        alert.addInput({
            type: 'radio',
            label: 'Ruta Basica',
            value: 'route_basic',
            checked: true
        });
        alert.addInput({
            type: 'radio',
            label: 'Ruta En Tiempo Real',
            value: 'route_avanced',
            checked: false
        });
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Crear',
            handler: function (tipe_route) {
                _this.confirmRuteMode(lat, lng, tipe_route);
            }
        });
        alert.present();
    };
    CreateroutePage.prototype.confirmRuteMode = function (lat, lng, tipe_route) {
        var _this = this;
        this.actionSheetCtrl.create({
            title: 'SELECCIONA EL TIPO DE RUTA',
            buttons: [
                {
                    text: 'Conduciendo Auto',
                    handler: function () {
                        _this.calcRoute('DRIVING', lat, lng, tipe_route);
                    }
                },
                {
                    text: 'Caminando',
                    handler: function () {
                        _this.calcRoute('WALKING', lat, lng, tipe_route);
                    }
                },
                {
                    text: 'Ciclo Via',
                    handler: function () {
                        _this.calcRoute('BICYCLING', lat, lng, tipe_route);
                    }
                },
                {
                    text: 'Transmilenio',
                    handler: function () {
                        _this.calcRoute('TRANSIT', lat, lng, tipe_route);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    CreateroutePage.prototype.calcRoute = function (mode, lat, lng, tipe_route) {
        var _this = this;
        var realTime = false;
        if (tipe_route === 'route_basic') {
            var callback = this.params.get("mode");
            callback(mode, lat, lng, realTime).then(function () {
                _this.navCtrl.pop();
            });
        }
        else if (tipe_route === 'route_avanced') {
            this.alertCtrl.create({
                title: 'Localizador!',
                message: 'Por favor para continuar activid la UBICACIÓN en tu dispositivo',
                buttons: [
                    {
                        text: 'Rota Basica',
                        handler: function () {
                            var callback = _this.params.get("mode");
                            callback(mode, lat, lng, realTime).then(function () {
                                _this.navCtrl.pop();
                            });
                        }
                    },
                    {
                        text: 'Activar',
                        handler: function () {
                            //locactions authorization true  
                            _this.diagnostic.isLocationAuthorized()
                                .then(function (isAvailable) {
                                if (isAvailable == true) {
                                    //locations enabled false
                                    _this.diagnostic.isLocationEnabled()
                                        .then(function (isAvailable) {
                                        if (isAvailable == true) {
                                            var callback = _this.params.get("mode");
                                            realTime = true;
                                            callback(mode, lat, lng, realTime).then(function () {
                                                _this.navCtrl.pop();
                                            });
                                        }
                                        else {
                                            _this.diagnostic.switchToLocationSettings();
                                            _this.toast.show("Activa la localizacion del dispositivo", '5000', 'bottom').subscribe(function (toast) {
                                                _this.confirmRuteMode(lat, lng, tipe_route);
                                            });
                                        }
                                    }).catch(function (e) {
                                        _this.toast.show('No se pudo crear la ruta, error: ' + e, '5000', 'bottom').subscribe(function (toast) { });
                                    });
                                }
                                else {
                                    _this.toast.show("La aplicacion necesita permisos para utilizar la localizacion", '5000', 'bottom').subscribe(function (toast) { });
                                }
                            }).catch(function (e) {
                                _this.toast.show("La aplicacion necesita autotizacion para utilizar la localizacion", '5000', 'bottom').subscribe(function (toast) { });
                            });
                        }
                    }
                ]
            }).present();
        }
    };
    return CreateroutePage;
}());
CreateroutePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-createroute',
        templateUrl: 'createroute.html',
        providers: [
            AngularFireDatabase,
            Diagnostic,
            Toast
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        AngularFireDatabase,
        NgZone,
        AlertController,
        ActionSheetController,
        NavParams,
        Diagnostic,
        Toast])
], CreateroutePage);
export { CreateroutePage };
//# sourceMappingURL=createroute.js.map