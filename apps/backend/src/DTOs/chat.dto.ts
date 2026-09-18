import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDTO {
  @IsString()
  @IsNotEmpty()
  chatId!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsString()
  @IsNotEmpty()
  to!: string;
}
