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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const date_fns_1 = require("date-fns");
const _ = __importStar(require("lodash"));
const database_1 = require("../../database");
const shared_1 = require("../../shared");
const enums_1 = require("../enums");
let UserService = class UserService {
    constructor(userRepository, roleRepository, appointmentRepository, bcryptService, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.appointmentRepository = appointmentRepository;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email },
                relations: ['roles']
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            // const isValidPassword = await this.bcryptService.compareHash(data.password, user.password);
            // if (false) throw new UnauthorizedException();
            const token = this.jwtService.sign(class_transformer_1.classToPlain(user));
            return { user, token };
        });
    }
    preProcessUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.userRepository.exists(user);
            if (!exists)
                delete user.id;
            if (user.password)
                user.password = yield this.bcryptService.hash(user.password);
            console.log(user);
        });
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.preProcessUser(user);
            return this.userRepository.save(user);
        });
    }
    saveDoctor(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.preProcessUser(user);
            delete user.roles;
            if (!user.id) {
                const role = yield this.roleRepository.findOne({
                    where: { name: enums_1.Roles.Doctor }
                });
                user.roles = [role];
            }
            return this.userRepository.save(user);
        });
    }
    savePatient(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.preProcessUser(user);
            delete user.roles;
            if (!user.id) {
                const role = yield this.roleRepository.findOne({
                    where: { name: enums_1.Roles.Patient }
                });
                user.roles = [role];
            }
            return this.userRepository.save(user);
        });
    }
    addUserAppointments(userId, appointments) {
        return __awaiter(this, void 0, void 0, function* () {
            _.forEach(appointments, (appointment) => appointment.doctor = { id: userId });
            const userRoles = yield this.userRepository.getUserRoles(userId);
            console.log(userRoles);
            if (!!_.find(userRoles, { name: enums_1.Roles.Doctor })) {
                const appointmentsCount = yield this.appointmentRepository.count({
                    where: { doctor: { id: userId, createdDate: date_fns_1.subDays(new Date(), 1) } }
                });
                if (appointmentsCount >= 5)
                    throw new common_1.BadRequestException();
            }
            return this.appointmentRepository.save(appointments);
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('UserRepositoryToken')),
    __param(1, common_1.Inject('RoleRepositoryToken')),
    __param(2, common_1.Inject('AppointmentRepositoryToken')),
    __metadata("design:paramtypes", [database_1.UserRepository,
        database_1.RoleRepository,
        database_1.AppointmentRepository,
        shared_1.BcryptService,
        shared_1.JwtService])
], UserService);
exports.UserService = UserService;
