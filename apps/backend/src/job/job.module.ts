import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { NeonDBProvider } from 'src/providers/postgres-db';
import { EmailModule } from 'src/email/email.module';

@Module({
  providers: [JobService, NeonDBProvider],
  controllers: [JobController],
  imports: [EmailModule],
})
export class JobModule {}
