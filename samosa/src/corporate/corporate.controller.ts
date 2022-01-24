import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { verifyRequerst } from 'src/utils/auth.utils';
import { CorporateService } from './corporate.service';
import { createCorporateDto, LoginDto, SignupDto } from './dto/corporate.dto';
import { ICorporate } from './interfaces/corporate.interface';

@Controller('corporate')
export class CorporateController {
  constructor(
    private readonly service: CorporateService,
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
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
  async update(@Req() request: Request, @Body() data: createCorporateDto) {
    const isAuthorized: boolean = await verifyRequerst(
      request,
      this.corporateModel,
    );
    if (isAuthorized) return this.service.update(data);
  }
}
