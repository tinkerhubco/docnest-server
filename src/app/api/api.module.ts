import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import { DatabaseModule } from '../database';
import { SharedModule } from '../shared';
import { UserService } from './services';
import {
  AddressResolver,
  AppointmentResolver,
  MediaResolver,
  RoleResolver,
  SubscriptionResolver,
  UserResolver
} from './resolvers';
import { AccessTokenMiddleware, VersionMiddleware } from './middlewares';

@Module({
  imports: [GraphQLModule, DatabaseModule, SharedModule],
  providers: [
    AddressResolver,
    AppointmentResolver,
    MediaResolver,
    RoleResolver,
    SubscriptionResolver,
    UserResolver,

    // services
    UserService
  ]
})
export class ApiModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  public configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(VersionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
      .apply(graphiqlExpress({ endpointURL: 'graphql' }))
      .forRoutes('/graphiql')
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
