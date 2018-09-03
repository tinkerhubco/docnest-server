"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const enums_1 = require("../enums");
let AccessControlGuard = class AccessControlGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const acl = this.reflector.get('acl', context.getHandler());
        if (!acl)
            return true;
        const request = context.switchToHttp().getRequest();
        return _.some(acl, (ac) => this.checkIfAllowed(ac, request));
    }
    checkIfAllowed(ac, request) {
        const user = request.user;
        switch (ac) {
            case enums_1.ACL.Everyone:
                return true;
            case enums_1.ACL.Authenticated:
                return !!user;
            case enums_1.ACL.Owner:
                return user && request.params.id === user.id;
            case enums_1.ACL.Admin:
                return user && _.find(user.roles, { name: enums_1.ACL.Admin });
            case enums_1.ACL.Doctor:
                return user && _.find(user.roles, { name: enums_1.ACL.Doctor });
            case enums_1.ACL.Patient:
                return user && _.find(user.roles, { name: enums_1.ACL.Patient });
            default:
                return false;
        }
    }
};
AccessControlGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AccessControlGuard);
exports.AccessControlGuard = AccessControlGuard;
