import { Controller, Get, Post, Body } from '@nestjs/common';
import { createStudentDto } from './dto/student.dto';
import { hashPassword } from '../utils/hashing';
@Controller('student')
export class StudentController {
  @Post('/create')
  async register(@Body() data: createStudentDto) {
    const password: string = data.password;
    console.log(hashPassword(password));
    return 'success';
  }
  @Get()
  async login() {
    return 'true';
  }
}
