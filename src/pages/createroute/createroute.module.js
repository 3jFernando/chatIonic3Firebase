var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateroutePage } from './createroute';
var CreateroutePageModule = (function () {
    function CreateroutePageModule() {
    }
    return CreateroutePageModule;
}());
CreateroutePageModule = __decorate([
    NgModule({
        declarations: [
            CreateroutePage,
        ],
        imports: [
            IonicPageModule.forChild(CreateroutePage),
        ],
        exports: [
            CreateroutePage
        ]
    })
], CreateroutePageModule);
export { CreateroutePageModule };
//# sourceMappingURL=createroute.module.js.map