import { IsString, IsNotEmpty } from 'class-validator';

export class createStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
