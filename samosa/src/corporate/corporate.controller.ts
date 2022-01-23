import { Body, Controller, Get, Post } from '@nestjs/common';
import { createCorporateDto } from './dto/corporate.dto';

@Controller('corporate')
export class CorporateController {
  @Get()
  findAll() {
    return 'corporate';
  }

  @Post('/create')
  createCorporate(@Body() data: createCorporateDto): string {
    console.log(data);
    return 'success';
  }
}
