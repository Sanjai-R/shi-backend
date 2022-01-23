import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICorporate } from './interfaces/corporate.interface';

@Injectable()
export class CorporateService {
  constructor(
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
  ) {}
}
