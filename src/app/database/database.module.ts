import { Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { DatabaseProviders } from './database.providers';

@Module({
  exports: [...DatabaseProviders, DatabaseService],
  providers: [...DatabaseProviders, DatabaseService]
})
export class DatabaseModule {}
