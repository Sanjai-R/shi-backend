import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  isBase64,
} from 'class-validator';

export class StudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
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
