import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class JobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  posted_by: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @IsString()
  @IsNotEmpty()
  key_qualifiations: string;

  @IsString()
  @IsNotEmpty()
  educational_requirements: string;

  @IsString()
  @IsNotEmpty()
  additional_requirements: string;

  @IsUrl()
  @IsNotEmpty()
  application_url: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  date_posted?: Date;
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
