"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const version = require(path_1.join(process.cwd(), 'package.json')).version;
let VersionMiddleware = class VersionMiddleware {
    resolve(...args) {
        return (request, response, next) => {
            response.set('X-Version', version);
            next();
        };
    }
};
VersionMiddleware = __decorate([
    common_1.Injectable()
], VersionMiddleware);
exports.VersionMiddleware = VersionMiddleware;
