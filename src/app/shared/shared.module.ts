import { Module } from '@nestjs/common';

import { BcryptService, JwtService } from './services';

@Module({
  providers: [BcryptService, JwtService],
  exports: [BcryptService, JwtService]
})
export class SharedModule {}
