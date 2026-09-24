import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class JobPostingDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(100)
  jobTitle!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  businessName!: string;

  @IsString()
  @IsNotEmpty()
  projectType!: string;

  @IsString()
  @IsNotEmpty()
  lookingFor!: string;

  @IsString()
  @IsNotEmpty()
  experienceLevel!: string;

  @IsString()
  @IsNotEmpty()
  jobType!: string;

  @IsString()
  @IsNotEmpty()
  paymentType!: string;

  @IsString()
  @IsNotEmpty()
  workLocation!: string;

  @IsString()
  @IsNotEmpty()
  region!: string;

  @IsString()
  @IsNotEmpty()
  timeline!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(1000)
  projectDetails!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  deliverables!: string;

  @IsNumber()
  @Min(5)
  @Max(5000)
  @IsNotEmpty()
  budgetMin!: number;

  @IsNumber()
  @Min(5)
  @Max(5000)
  @IsNotEmpty()
  budgetMax!: number;

  @IsArray()
  @IsNotEmpty()
  skills!: string[];
}
