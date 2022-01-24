import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CorporateService } from './corporate.service';
import { createCorporateDto, LoginDto, SignupDto } from './dto/corporate.dto';

function check(request: Request): boolean {
  console.log('checking.....');
  console.log(request.headers.authorization);
  if (!request.headers.authorization) throw new UnauthorizedException();
  return true;
}
@Controller('corporate')
export class CorporateController {
  constructor(private readonly service: CorporateService) {}

  @Post('/signup')
  Signup(@Body() data: SignupDto) {
    return this.service.SignUp(data);
  }

  @Get('/login')
  Login(@Query() params: LoginDto) {
    console.log(params.email);
    console.log(params.password);
    return 'dome';
  }

  @Put('/update')
  update(@Req() request: Request, @Body() data: createCorporateDto) {
    const isAuthorized: boolean = check(request);
    if (isAuthorized) return this.service.update(data);
  }
}
