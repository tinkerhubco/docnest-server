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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const database_1 = require("../../database");
let RoleResolver = class RoleResolver {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    getRole(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roleId } = args;
            return this.roleRepository.findOne(roleId);
        });
    }
    getRoles(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.find();
        });
    }
    saveRole(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role } = args;
            return this.roleRepository.save(Object.assign({}, role));
        });
    }
    deleteRole(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { roleId } = args;
            return this.roleRepository.delete(roleId);
        });
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "getRole", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "getRoles", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "saveRole", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "deleteRole", null);
RoleResolver = __decorate([
    graphql_1.Resolver('Role'),
    __param(0, common_1.Inject('RoleRepositoryToken')),
    __metadata("design:paramtypes", [database_1.RoleRepository])
], RoleResolver);
exports.RoleResolver = RoleResolver;
