"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const config = require("config");
const typeorm_1 = require("typeorm");
const repositories_1 = require("./repositories");
exports.DatabaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: () => __awaiter(this, void 0, void 0, function* () { return yield typeorm_1.createConnection(_.clone(config.get('database'))); })
    },
    {
        provide: 'UserRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.UserRepository),
        inject: ['DbConnectionToken']
    },
    {
        provide: 'RoleRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.RoleRepository),
        inject: ['DbConnectionToken']
    },
    {
        provide: 'MediaRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.MediaRepository),
        inject: ['DbConnectionToken']
    },
    {
        provide: 'AppointmentRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.AppointmentRepository),
        inject: ['DbConnectionToken']
    },
    {
        provide: 'AddressRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.AddressRepository),
        inject: ['DbConnectionToken']
    },
    {
        provide: 'SubscriptionRepositoryToken',
        useFactory: (connection) => connection.getCustomRepository(repositories_1.SubscriptionRepository),
        inject: ['DbConnectionToken']
    }
];
