import { Reflector } from '@nestjs/core';
import { UserRole } from '@repo/shared-types';

export const Roles = Reflector.createDecorator<UserRole[]>();
