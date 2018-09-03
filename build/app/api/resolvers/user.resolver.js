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
const guards_1 = require("../guards");
const decorators_1 = require("../decorators");
const enums_1 = require("../enums");
const services_1 = require("../services");
let UserResolver = class UserResolver {
    constructor(userRepository, roleRepository, appointmentRepository, userService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.appointmentRepository = appointmentRepository;
        this.userService = userService;
    }
    getUser(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = args;
            return this.userRepository.findOne(userId);
        });
    }
    getUsers(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    getDoctors(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getDoctors();
        });
    }
    getPatients(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getPatients();
        });
    }
    saveUser(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = args;
            return this.userService.saveUser(Object.assign({}, user));
        });
    }
    saveDoctor(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = args;
            return this.userService.saveDoctor(Object.assign({}, user));
        });
    }
    savePatient(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = args;
            return this.userService.savePatient(Object.assign({}, user));
        });
    }
    deleteUser(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = args;
            return this.userRepository.delete(userId);
        });
    }
    login(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = args;
            return this.userService.login(email, password);
        });
    }
    getUserRoles(user, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository
                .createQueryBuilder()
                .relation('roles')
                .of(user)
                .loadMany();
        });
    }
    getUserSubscription(user, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository
                .createQueryBuilder()
                .relation('subscription')
                .of(user)
                .loadOne();
        });
    }
    getUserAppointments(user, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.find({
                where: { doctor: { id: user.id } }
            });
        });
    }
};
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin]),
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin]),
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsers", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin]),
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getDoctors", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin, enums_1.ACL.Doctor]),
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getPatients", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin]),
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "saveUser", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin, enums_1.ACL.Doctor]),
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "saveDoctor", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin, enums_1.ACL.Doctor]),
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "savePatient", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin]),
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    graphql_1.ResolveProperty('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserRoles", null);
__decorate([
    graphql_1.ResolveProperty('subscription'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserSubscription", null);
__decorate([
    graphql_1.ResolveProperty('appointments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserAppointments", null);
UserResolver = __decorate([
    common_1.UseGuards(guards_1.AccessControlGuard),
    graphql_1.Resolver('User'),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __param(1, common_1.Inject('RoleRepositoryToken')),
    __param(2, common_1.Inject('AppointmentRepositoryToken')),
    __metadata("design:paramtypes", [database_1.UserRepository,
        database_1.RoleRepository,
        database_1.AppointmentRepository,
        services_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
