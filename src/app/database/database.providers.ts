import _ = require('lodash');
import config = require('config');
import { createConnection, Connection } from 'typeorm';

import { UserRepository, RoleRepository, MediaRepository, AppointmentRepository, AddressRepository, SubscriptionRepository } from './repositories';

export const DatabaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () =>
    await createConnection(_.clone(config.get('database')))
  },
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(UserRepository),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'RoleRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(RoleRepository),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'MediaRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(MediaRepository),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'AppointmentRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(AppointmentRepository),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'AddressRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(AddressRepository),
    inject: ['DbConnectionToken']
  },
  {
    provide: 'SubscriptionRepositoryToken',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(SubscriptionRepository),
    inject: ['DbConnectionToken']
  }
];