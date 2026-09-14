import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NeonDBProvider } from 'src/config/postgres-db';
import { ImageKitProvider } from 'src/config/imagekit';

@Module({
  providers: [UserService, NeonDBProvider, ImageKitProvider],
  controllers: [UserController],
})
export class UserModule {}
