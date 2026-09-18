import { IsNotEmpty, IsString } from 'class-validator';
import { IsBigInt } from 'class-validator-extended';

export class CreateChatDTO {
  @IsBigInt()
  @IsNotEmpty()
  chatID!: bigint;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsBigInt()
  @IsNotEmpty()
  to!: bigint;
}
