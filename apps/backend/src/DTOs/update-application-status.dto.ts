import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateApplicationStatusDTO {
  @IsEnum(['accepted', 'rejected', 'pending'])
  status!: 'accepted' | 'rejected' | 'pending';

  @IsString()
  @IsNotEmpty()
  applicantName!: string;

  @IsEmail()
  applicantEmail!: string;

  @IsString()
  @IsNotEmpty()
  jobTitle!: string;

  @IsString()
  @IsNotEmpty()
  jobId!: string;
}
