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
  company_name: string;

  @IsUrl()
  @IsOptional()
  company_website: string;

  @IsUrl()
  @IsOptional()
  company_logo: string;

  @IsString()
  company_address: string;
}
