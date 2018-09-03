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
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../database");
const shared_1 = require("../shared");
const services_1 = require("./services");
const resolvers_1 = require("./resolvers");
const middlewares_1 = require("./middlewares");
let ApiModule = class ApiModule {
    constructor(graphQLFactory) {
        this.graphQLFactory = graphQLFactory;
    }
    configure(consumer) {
        const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
        const schema = this.graphQLFactory.createSchema({ typeDefs });
        consumer
            .apply(middlewares_1.AccessTokenMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL })
            .apply(middlewares_1.VersionMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL })
            .apply(apollo_server_express_1.graphiqlExpress({ endpointURL: 'graphql' }))
            .forRoutes('/graphiql')
            .apply(apollo_server_express_1.graphqlExpress(req => ({ schema, rootValue: req })))
            .forRoutes('/graphql');
    }
};
ApiModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule,
            database_1.DatabaseModule,
            shared_1.SharedModule
        ],
        providers: [
            resolvers_1.AddressResolver,
            resolvers_1.AppointmentResolver,
            resolvers_1.MediaResolver,
            resolvers_1.RoleResolver,
            resolvers_1.SubscriptionResolver,
            resolvers_1.UserResolver,
            // services
            services_1.UserService
        ]
    }),
    __metadata("design:paramtypes", [graphql_1.GraphQLFactory])
], ApiModule);
exports.ApiModule = ApiModule;
