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

  @Post('/signup')
  Signup(@Body() data: SignupDto) {
    return this.service.SignUp(data);
  }

  @Get('/login')
  Login(@Query() params: LoginDto) {
    return this.service.login(params);
  }

  @Post('/resume-parser')
  async parser(@Req() request: Request, @Body() body: ParserDto): Promise<any> {
    const isAuthorized = await verifyRequest(request, this.studentModel);
    if (isAuthorized) return this.service.parser(body);
  }

  // @Put('/update')
  // async update(@Req() request: Request, @Body() data: createCorporateDto) {
  //   const isAuthorized: boolean = await verifyRequest(
  //     request,
  //     this.corporateModel,
  //   );
  //   if (isAuthorized) return this.service.update(data);
  // }
}
