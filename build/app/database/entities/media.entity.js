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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Media = class Media {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Media.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Media.prototype, "filename", void 0);
__decorate([
    typeorm_1.Column({ name: 'original_url' }),
    __metadata("design:type", String)
], Media.prototype, "originalUrl", void 0);
__decorate([
    typeorm_1.Column({ name: 'small_url' }),
    __metadata("design:type", String)
], Media.prototype, "smallUrl", void 0);
__decorate([
    typeorm_1.Column({ name: 'medium_url' }),
    __metadata("design:type", String)
], Media.prototype, "mediumUrl", void 0);
__decorate([
    typeorm_1.Column({ name: 'large_url' }),
    __metadata("design:type", String)
], Media.prototype, "largeUrl", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        name: 'created_date',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], Media.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        name: 'updated_date',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], Media.prototype, "updatedDate", void 0);
Media = __decorate([
    typeorm_1.Entity()
], Media);
exports.Media = Media;
