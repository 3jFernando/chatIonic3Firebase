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
import { EmailComposer } from '@ionic-native/email-composer';
import { Toast } from '@ionic-native/toast';
var SendEmailPage = (function () {
    function SendEmailPage(navCtrl, navParams, emailComposer, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.emailComposer = emailComposer;
        this.toast = toast;
        this.emailContact = this.navParams.data.emailContact;
        this.emailUser = this.navParams.data.emailUser;
        this.txt_subject = "";
        this.txt_message = "";
    }
    SendEmailPage.prototype.btnCancelEmail = function () {
        this.navCtrl.pop();
    };
    SendEmailPage.prototype.btnSendEmail = function () {
        var _this = this;
        this.emailComposer.isAvailable().then(function (avalible) {
            if (avalible) {
                var email = {
                    to: _this.emailContact,
                    cc: _this.emailUser,
                    //bcc: [],
                    //attachments: [],
                    subject: _this.txt_subject,
                    body: _this.txt_message,
                    isHtml: true
                };
                _this.emailComposer.open(email);
            }
            else {
                _this.toast.show('El dispositivo no es compatible con el servicio de EMAIL', '5000', 'bottom').subscribe(function (toast) { });
            }
        });
    };
    return SendEmailPage;
}());
SendEmailPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-send-email',
        templateUrl: 'send-email.html',
        providers: [EmailComposer, Toast]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        EmailComposer,
        Toast])
], SendEmailPage);
export { SendEmailPage };
//# sourceMappingURL=send-email.js.map