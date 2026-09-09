import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.['auth-session'],
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  async validate(payload: { _id: string; sub: string }) {
    const { _id } = payload;
    // const user = await this.userModel.findById(_id).exec();
    // if (!user) {
    //   throw new UnauthorizedException('Please log in first');
    // }
    // return user;
  }
}
