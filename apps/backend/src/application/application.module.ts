import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { NeonDBProvider } from 'src/providers/postgres-db';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [ApplicationService, NeonDBProvider],
  controllers: [ApplicationController],
  imports: [EmailModule],
})
export class ApplicationModule {}
