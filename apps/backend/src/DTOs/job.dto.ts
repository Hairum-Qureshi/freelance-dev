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

type ProjectType =
  | 'website'
  | 'ecommerce'
  | 'mobile-app'
  | 'api-backend'
  | 'database'
  | 'bug-fix'
  | 'feature'
  | 'redesign'
  | 'maintenance';
type LookingFor =
  | 'frontend-developer'
  | 'backend-developer'
  | 'fullstack-developer'
  | 'mobile-developer'
  | 'designer'
  | 'graphic-designer'
  | 'wordpress-developer'
  | 'qa-tester'
  | 'data-analyst';
type ExperienceLevel = 'beginner' | 'entry' | 'intermediate';
type JobType = 'freelance' | 'remote' | 'contract' | 'full-time' | 'part-time';
type PaymentType = 'fixed-price' | 'hourly';
type WorkLocation = 'remote' | 'on-site' | 'hybrid';
type Region =
  | 'north-america'
  | 'latin-america'
  | 'europe'
  | 'middle-east-africa'
  | 'asia-pacific';
type Timeline = 'asap' | '1-2-weeks' | '1-month' | '2-3-months' | 'flexible';

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
  projectType!: ProjectType;

  @IsString()
  @IsNotEmpty()
  lookingFor!: LookingFor;

  @IsString()
  @IsNotEmpty()
  experienceLevel!: ExperienceLevel;

  @IsString()
  @IsNotEmpty()
  jobType!: JobType;

  @IsString()
  @IsNotEmpty()
  paymentType!: PaymentType;

  @IsString()
  @IsNotEmpty()
  workLocation!: WorkLocation;

  @IsString()
  @IsNotEmpty()
  region!: Region;

  @IsString()
  @IsNotEmpty()
  timeline!: Timeline;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(1000)
  projectDetails!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  @MaxLength(1000)
  deliverables!: string;

  @IsNumber()
  @Min(5)
  @Max(5000)
  @IsNotEmpty()
  salaryMin!: number;

  @IsNumber()
  @Min(5)
  @Max(5000)
  @IsNotEmpty()
  salaryMax!: number;

  @IsArray()
  @IsNotEmpty()
  skills!: string[];
}
