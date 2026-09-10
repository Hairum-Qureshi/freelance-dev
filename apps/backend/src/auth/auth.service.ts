import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import { SnowflakeId } from 'snowflake-id';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('GoogleOAuthClient') private googleOAuthClient: OAuth2Client,
    private configService: ConfigService,
    @Inject('NeonDBProvider') private sql: ReturnType<typeof neon>,
  ) {}

  getAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
    };
  }

  async googleAuth(token: string): Promise<{ jwtToken: string }> {
    const ticket = await this.googleOAuthClient.verifyIdToken({
      idToken: token,
      audience: this.configService.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
    });

    const { email, picture, given_name, family_name } =
      ticket.getPayload() || {};

    let [user] = (await this
      .sql`SELECT * FROM users WHERE email = ${email}`) as UserPayload[];

    if (!user) {
      const snowflake = new SnowflakeId({
        mid: 42,
        offset: (2026 - 1970) * 31536000 * 1000,
      });

      [user] = (await this
        .sql`INSERT INTO users (id, first_name, last_name, email, profile_picture) VALUES (${snowflake.generate()}, ${given_name || 'GoogleUser'}, ${family_name || 'GoogleUser'}, ${email}, ${picture}) RETURNING *`) as UserPayload[];
    }

    const jwtToken = this.jwtService.sign({
      _id: user.id,
    });

    return { jwtToken };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }
}
