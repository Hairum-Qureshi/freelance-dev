import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDTO {
  @IsString()
  @IsNotEmpty()
  chatID!: bigint;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  to!: string;
}
