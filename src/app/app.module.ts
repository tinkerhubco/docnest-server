import { Module } from '@nestjs/common';

import { ApiModule } from './api';

@Module({
  imports: [
    ApiModule
  ]
})
export class AppModule {}
