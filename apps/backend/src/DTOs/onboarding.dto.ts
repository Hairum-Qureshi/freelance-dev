import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class OnboardingDTO {
  @IsOptional()
  @IsEnum(['Hire', 'Work'])
  role!: 'Hire' | 'Work';

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hiringFor?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seekingProjects?: string[];

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hopes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];
}
