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
const role_entity_1 = require("./role.entity");
const media_entity_1 = require("./media.entity");
const address_entity_1 = require("./address.entity");
const subscription_entity_1 = require("./subscription.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        name: 'first_name'
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        name: 'middle_name'
    }),
    __metadata("design:type", String)
], User.prototype, "middleName", void 0);
__decorate([
    typeorm_1.Column({
        name: 'last_name'
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        name: 'created_date',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        name: 'updated_date',
        type: 'timestamp'
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.OneToOne(type => media_entity_1.Media),
    typeorm_1.JoinColumn({ name: 'profile_media_id' }),
    __metadata("design:type", media_entity_1.Media)
], User.prototype, "profileMedia", void 0);
__decorate([
    typeorm_1.OneToOne(type => subscription_entity_1.Subscription),
    typeorm_1.JoinColumn({ name: 'subscription_id' }),
    __metadata("design:type", subscription_entity_1.Subscription)
], User.prototype, "subscription", void 0);
__decorate([
    typeorm_1.ManyToMany(type => role_entity_1.Role),
    typeorm_1.JoinTable({
        name: 'user_role',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'role_id' }
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    typeorm_1.ManyToMany(type => address_entity_1.Address),
    typeorm_1.JoinTable({
        name: 'user_address',
        joinColumn: { name: 'user_id' },
        inverseJoinColumn: { name: 'address_id' }
    }),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
