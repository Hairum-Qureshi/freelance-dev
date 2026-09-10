import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { neon } from '@neondatabase/serverless';
import SnowflakeId from 'snowflake-id';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('GoogleOAuthClient') private googleOAuthClient: OAuth2Client,
    private configService: ConfigService,
    @Inject('NeonDBProvider') private sql: ReturnType<typeof neon>,
    private httpService: HttpService,
  ) {}

  getAuthCookieOptions() {
    return {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
    };
  }

  async googleAuth(accessToken: string): Promise<{ jwtToken: string }> {
    const response = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    if (!response) {
      throw new UnauthorizedException('Invalid Google access token');
    }

    const googleUser = (await response.data) as {
      email: string;
      picture: string;
      given_name: string;
      family_name: string;
    };

    const { email, picture, given_name, family_name } = googleUser;

    let [user] = (await this
      .sql`SELECT * FROM users WHERE email = ${email}`) as UserPayload[];

    if (!user) {
      const snowflake = new SnowflakeId({
        mid: 42,
        offset: (2026 - 1970) * 31536000 * 1000,
      });

      [user] = (await this
        .sql`INSERT INTO users (id, "firstName", "lastName", email, "profilePicture", "createdAt", "updatedAt") VALUES (${snowflake.generate()}, ${given_name}, ${family_name}, ${email}, ${picture}, NOW(), NOW()) RETURNING *`) as UserPayload[];
    }

    const jwtToken = this.jwtService.sign({ id: user.id });

    return { jwtToken };
  }

  getCurrentUser(user: UserPayload): UserPayload {
    return user;
  }
}
