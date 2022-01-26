import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JobInterface } from './interfaces/job.interface';
import { JobDto, UpdateJobDto, CategoryJobDto } from './dto/job.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly jobModel: Model<JobInterface>,
  ) {}
  async createJob(data: JobDto) {
    const newJob = new this.jobModel(data);
    await newJob.save();

    return {
      success: true,
      message: 'proceed to next step',
      data: newJob,
    };
  }

  async updateJob(data: UpdateJobDto) {
    const { company_name, title, ...rest } = data;
    const updateData = await this.jobModel.findOneAndUpdate(
      { company_name, title },
      rest,
      {
        new: true,
      },
    );
    if (updateData === null) throw new NotFoundException();
    else {
      return updateData;
    }
  }
  async closeJob(data: UpdateJobDto) {
    const { company_name, title } = data;
    const res = await this.jobModel.findOneAndUpdate(
      { company_name, title },
      { is_closed: true },
      {
        new: true,
      },
    );
    if (res === null) throw new NotFoundException();
    else {
      return res;
    }
  }
  async getAllJobs() {
    const jobs = await this.jobModel.find();
    return jobs;
  }

  async getJobByComapny(id: string) {
    const jobs = await this.jobModel
      .find({ posted_by: id })
      .sort({ date_posted: 'desc' })
      .populate(
        'posted_by',
        'company_name company_address mobile_number company_website company_logo',
      );
    return jobs;
  }

  async getJobByCategory(category: CategoryJobDto) {
    const jobs = await this.jobModel.find({ title: category.title });
    return jobs;
  }
}
