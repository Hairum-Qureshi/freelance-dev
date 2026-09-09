import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('NeonDBProvider') private sql: ReturnType<typeof neon>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['auth-session'],
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  async validate(payload: { id: string; sub: string }) {
    const { id } = payload;
    const user = await this.sql`SELECT * FROM users WHERE id = ${id}`.then(
      (res) => res[0],
    );
    if (!user) {
      throw new UnauthorizedException('Please log in first');
    }
    return user;
  }
}
