import { Injectable, Inject } from '@nestjs/common';
import { RESEND_CLIENT } from '../providers/resend';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';
import { EMAIL_TEMPLATE } from './templates/new-contact-message';
import { ACCEPTED_EMAIL_TEMPLATE } from './templates/hired';
import { REJECTED_EMAIL_TEMPLATE } from './templates/rejected';
import { RETRACTED_EMAIL_TEMPLATE } from './templates/retracted';

@Injectable()
export class EmailService {
  constructor(
    @Inject(RESEND_CLIENT) private readonly resend: Resend,
    private readonly configService: ConfigService,
  ) {}

  async sendNewContactMessageNotifEmail(
    to: string,
    fullName: string,
    timestamp: string,
    message: string,
    initials: string,
    messageUrl: string,
  ) {
    return this.resend.emails.send({
      from: `Freelance Dev <${this.configService.getOrThrow<string>('EMAIL_FROM')}>`,
      to,
      subject: 'New Contact Message',
      html: EMAIL_TEMPLATE.replace('{{full name}}', fullName)
        .replace('{{ email }}', to)
        .replace('{{ initials }}', initials)
        .replace('{{ timestamp }}', timestamp)
        .replace('{{ message }}', message)
        .replace('{{ message_url }}', messageUrl),
    });
  }

  async sendApplicationStatusUpdateEmail(
    to: string,
    applicantName: string,
    status: 'accepted' | 'rejected',
  ) {
    return this.resend.emails.send({
      from: `Freelance Dev <${this.configService.getOrThrow<string>('EMAIL_FROM')}>`,
      to,
      subject: 'Application Status Update',
      html: EMAIL_TEMPLATE.replace('{{full name}}', applicantName)
        .replace('{{ email }}', to)
        .replace('{{ status }}', status),
    });
  }

  async sendApplicationStatusEmail(
    to: string,
    applicantName: string,
    status: 'accepted' | 'rejected' | 'pending',
    jobTitle: string,
    jobId: string,
  ) {
    return this.resend.emails.send({
      from: `Freelance Dev <${this.configService.getOrThrow<string>('EMAIL_FROM')}>`,
      to,
      subject: 'Application Status Update',
      html:
        status === 'accepted'
          ? ACCEPTED_EMAIL_TEMPLATE.replace('{{ name }}', applicantName)
              .replace('{{ email }}', to)
              .replace('{{ status }}', status)
              .replaceAll('{{ title }}', jobTitle)
              .replace(
                '{{ job_url }}',
                `${this.configService.getOrThrow<string>('FRONTEND_URL')}/listing/${jobId}`,
              )
          : status === 'rejected'
            ? REJECTED_EMAIL_TEMPLATE.replace('{{ name }}', applicantName)
                .replace('{{ email }}', to)
                .replace('{{ status }}', status)
                .replaceAll('{{ title }}', jobTitle)
            : RETRACTED_EMAIL_TEMPLATE.replace('{{ name }}', applicantName)
                .replace('{{ email }}', to)
                .replace('{{ status }}', status)
                .replaceAll('{{ title }}', jobTitle),
    });
  }
}
