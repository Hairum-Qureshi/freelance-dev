import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  mixin,
  NotFoundException,
} from '@nestjs/common';
import type { ApplicationPayload, UserPayload } from '@repo/shared-types';
import { Database } from 'src/providers/postgres-db';

export function IsOwnerGuard(freelancerAction: boolean) {
  @Injectable()
  class IsOwnerGuardMixin implements CanActivate {
    constructor(
      @Inject('NeonDBProvider')
      readonly db: Database,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const applicationId = context.switchToHttp().getRequest()
        .params.applicationId;
      const jobId = context.switchToHttp().getRequest().params.jobId;
      const user: UserPayload = context.switchToHttp().getRequest().user;

      if (applicationId) {
        const application = (await this.db.query.applicationsTable.findFirst({
          where: (applicationsTable, { eq }) =>
            eq(applicationsTable.id, applicationId),
          with: {
            job: true,
            applicant: true,
          },
        })) as ApplicationPayload;

        if (!application) {
          throw new NotFoundException('Application not found');
        }

        if (freelancerAction && application.applicant.id !== user.id) {
          throw new ForbiddenException('You do not own this application');
        }

        if (!freelancerAction && application.job.posterId !== user.id) {
          throw new ForbiddenException('You do not own this job');
        }
      }

      if (jobId) {
        const job = await this.db.query.jobPostsTable.findFirst({
          where: (jobPostsTable, { eq }) => eq(jobPostsTable.id, jobId),
        });

        if (!job) {
          throw new NotFoundException('Job not found');
        }

        if (freelancerAction && job.posterId !== user.id) {
          throw new ForbiddenException('You do not own this job');
        }

        if (!freelancerAction && job.posterId !== user.id) {
          throw new ForbiddenException('You do not own this job');
        }
      }

      return true;
    }
  }

  return mixin(IsOwnerGuardMixin);
}
