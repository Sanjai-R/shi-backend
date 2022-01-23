import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class createCorporateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number: string;

  @IsString()
  @IsNotEmpty()
  company_name: String;

  @IsUrl()
  @IsOptional()
  company_website: String;

  @IsUrl()
  @IsOptional()
  company_logo: String;

  @IsString()
  company_address: String;
}
