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
const graphql_1 = require("@nestjs/graphql");
const date_fns_1 = require("date-fns");
const _ = __importStar(require("lodash"));
const database_1 = require("../../database");
const enums_1 = require("../enums");
const decorators_1 = require("../decorators");
const guards_1 = require("../guards");
let AppointmentResolver = class AppointmentResolver {
    constructor(appointmentRepository, userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }
    getAppointment(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointmentId } = args;
            return this.appointmentRepository.findOne(appointmentId);
        });
    }
    getAppointments(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository.find();
        });
    }
    saveAppointment(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = request.user;
            const { appointment } = args;
            if (!!_.find(currentUser.roles, { name: enums_1.Roles.Doctor })) {
                appointment.doctor = { id: currentUser.id };
                const appointmentsCount = yield this.appointmentRepository.count({
                    where: { doctor: { id: currentUser.id, createdDate: date_fns_1.subDays(new Date(), 1) } }
                });
                if (appointmentsCount >= 5)
                    throw new common_1.BadRequestException();
            }
            return this.appointmentRepository.save(Object.assign({}, appointment));
        });
    }
    deleteAppointment(request, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { appointmentId } = args;
            return this.appointmentRepository.delete(appointmentId);
        });
    }
    getAppointmentPatient(appointment, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository
                .createQueryBuilder()
                .relation('patient')
                .of(appointment)
                .loadOne();
        });
    }
    getAppointmentDoctor(appointment, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.appointmentRepository
                .createQueryBuilder()
                .relation('doctor')
                .of(appointment)
                .loadOne();
        });
    }
};
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointment", null);
__decorate([
    graphql_1.Query(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointments", null);
__decorate([
    decorators_1.AccessControl([enums_1.ACL.Admin, enums_1.ACL.Doctor]),
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "saveAppointment", null);
__decorate([
    graphql_1.Mutation(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "deleteAppointment", null);
__decorate([
    graphql_1.ResolveProperty('patient'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_1.Appointment, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentPatient", null);
__decorate([
    graphql_1.ResolveProperty('doctor'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [database_1.Appointment, Object]),
    __metadata("design:returntype", Promise)
], AppointmentResolver.prototype, "getAppointmentDoctor", null);
AppointmentResolver = __decorate([
    common_1.UseGuards(guards_1.AccessControlGuard),
    graphql_1.Resolver('Appointment'),
    __param(0, common_1.Inject('AppointmentRepositoryToken')),
    __param(1, common_1.Inject('UserRepositoryToken')),
    __metadata("design:paramtypes", [database_1.AppointmentRepository,
        database_1.UserRepository])
], AppointmentResolver);
exports.AppointmentResolver = AppointmentResolver;
