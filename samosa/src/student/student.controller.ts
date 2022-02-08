import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { verifyRequest } from 'src/utils/auth.utils';
import { StudentService } from './student.service';
import { StudentDto, LoginDto, SignupDto, ParserDto } from './dto/student.dto';
import { IStudent } from './interfaces/student.interface';
@Controller('student')
export class StudentController {
  constructor(
    private readonly service: StudentService,
    @InjectModel('Student')
    private readonly studentModel: Model<IStudent>,
  ) {}

  @Get('/is-logged')
  isLogged(@Req() request: Request) {
    return this.service.isLoggedIn(request);
  }

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
    const isAuthorized = await verifyRequest(request, this.studentModel);
    if (isAuthorized) return this.service.update(data);
  }

  @Post('/resume-parser')
  async parser(@Req() request: Request, @Body() body: ParserDto): Promise<any> {
    const isAuthorized = await verifyRequest(request, this.studentModel);
    if (isAuthorized) return this.service.parser(body);
  }
  @Get('/get-all-students')
  async getAllStudents() {
    const data = await this.service.getAllStudents();
    return data;
  }
  @Get('/getStudentsById')
  async getStudentsById(@Query('id') params: string) {
    const data = await this.service.getStudentsById(params);
    return data;
  }
}
