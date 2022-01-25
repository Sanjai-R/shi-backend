import { IsMobilePhone, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class JobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsNotEmpty()
  required_skills?: string[];

  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsUrl()
  @IsNotEmpty()
  company_website: string;

  @IsString()
  @IsNotEmpty()
  contact_number: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  experience_level: string;
  job_type: string;
  date_posted?: Date;
  is_closed?: boolean;
}
export class UpdateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  description: string;
  company_website: string;
  contact_number: string;
  location: string;
  experience_level: string;
  job_type: string;
  date_posted?: Date;
  is_closed?: boolean;
  salary: string;
  required_skills?: string[];
}
export class CompletedJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  is_closed?: boolean;
}
export class CategoryJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
