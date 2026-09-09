import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';

export const NeonDBProvider = {
  provide: 'NeonDBProvider',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const sql = neon(configService.get<string>('NEON_DB_URL')!);
    return sql;
  },
};
