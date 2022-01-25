import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { verifyRequest } from 'src/utils/auth.utils';
import { StudentService } from './student.service';
import { StudentDto, LoginDto, SignupDto } from './dto/student.dto';
import { IStudent } from './interfaces/student.interface';
@Controller('student')
export class StudentController {
  constructor(
    private readonly service: StudentService,
    @InjectModel('Student')
    private readonly corporateModel: Model<IStudent>,
  ) {}

  @Post('/signup')
  Signup(@Body() data: SignupDto) {
    return this.service.SignUp(data);
  }

  @Get('/login')
  Login(@Query() params: LoginDto) {
    return this.service.login(params);
  }

  @Put('/update')
  async update(@Req() request: Request, @Body() data: StudentDto) {
    return this.service.update(data);
  }
}
