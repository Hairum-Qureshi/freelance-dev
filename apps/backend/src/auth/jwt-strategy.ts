import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { usersTable } from 'src/schema';
import type { Database } from 'src/providers/postgres-db';
import type { UserPayload } from '@repo/shared-types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('NeonDBProvider') private readonly db: Database,
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
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) {
      throw new UnauthorizedException('Please log in first');
    }
    const userPayload: UserPayload = {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
      completedOnboarding: user.completedOnboarding ?? false,
      onboardingAnswers: user.onboardingAnswers,
      resumeId: user.resumeId,
      location: user.location,
      deleted: user.deleted ?? false,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userPayload;
  }
}
