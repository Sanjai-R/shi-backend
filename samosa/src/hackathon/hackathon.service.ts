import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hackathonScrapper } from 'src/utils/scrapper.utils';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HackathonService {
  constructor(
    @InjectModel('Hackathon')
    private readonly hackathonModel: Model<any>,
  ) {}
  async getHackathon() {
    const data = await this.hackathonModel.find();
    return data;
  }
  async postHackathon() {
    const hackathon = await hackathonScrapper();

    hackathon.map(async (ele) => {
      await new this.hackathonModel(ele).save();
    });
    return {
      success: true,
      description: 'Hackathons added successfully',
      data: hackathon,
    };
  }
}
