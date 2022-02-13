import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsArray()
  options: [];
}
