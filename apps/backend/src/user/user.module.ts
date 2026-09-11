import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NeonDBProvider } from 'src/config/postgres-db';

@Module({
  providers: [UserService, NeonDBProvider],
  controllers: [UserController],
})
export class UserModule {}
