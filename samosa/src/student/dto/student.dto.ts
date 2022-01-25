import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  isBase64,
} from 'class-validator';

export class StudentDto {
  email: string;
  mobile_number: string;
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  device_id: string;
  skills?: string[];
  college?: string;
  profiles?: [];
  location?: string;
  passed_out_year?: number;
  projects?: string[];
  education: string[];
  experience_level?: number;
}
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  mobile_number: string;

  @IsNotEmpty()
  @IsString()
  device_id: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ParserDto {
  @IsNotEmpty()
  @IsString()
  data_url: string;

  @IsNotEmpty()
  @IsString()
  file_name: string;
}
