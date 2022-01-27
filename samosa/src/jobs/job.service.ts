import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JobInterface } from './interfaces/job.interface';
import { JobDto, UpdateJobDto, CategoryJobDto } from './dto/job.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class JobService {
  constructor(
    @InjectModel('Job')
    private readonly jobModel: Model<JobInterface>,
    @InjectModel('Skill') private readonly skillModel: Model<{ skill: string }>,
    @InjectModel('Student') private readonly studentModel: Model<any>,
  ) {}
  async createJob(data: JobDto) {
    const skills = await this.skillModel.find();
    const skillsDB = skills.map((skill) => skill.skill);
    const keyQualification = data.key_qualifiations;
    const Discription = data.description;
    const Additional = data.additional_requirements;
    const _required_skills = [];
    keyQualification.split(' ').forEach((word) => {
      const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
      if (skillsDB.includes(sanitizeWord)) {
        _required_skills.push(sanitizeWord);
      }
    });
    Discription.split(' ').forEach((word) => {
      const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
      if (skillsDB.includes(sanitizeWord)) {
        _required_skills.push(sanitizeWord);
      }
    });
    Additional.split(' ').forEach((word) => {
      const sanitizeWord = word.replace(/[.,-?;:!\s]/g, '').toLowerCase();
      if (skillsDB.includes(sanitizeWord)) {
        _required_skills.push(sanitizeWord);
      }
    });

    const _required_skills_unique = [...new Set(_required_skills)];

    const recomended_candidates = await this.studentModel
      .find({ '_skills_private.skill': { $in: _required_skills_unique } })
      .select('_id');

    const _id = new Types.ObjectId();

    const InsertData = {
      _id,
      ...data,
      _required_skills: _required_skills_unique,
      recommended_candidates: recomended_candidates,
    };

    const newJob = new this.jobModel(InsertData);
    await newJob.save();
    await this.studentModel.updateMany(
      { _id: recomended_candidates },
      {
        $push: { recommended_jobs: _id },
      },
    );
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
      .populate([
        {
          path: 'posted_by',
          select:
            'company_name company_address mobile_number company_website company_logo',
        },
        { path: 'recommended_candidates', select: 'email name' },
      ]);
    return jobs;
  }

  async getJobByCategory(category: CategoryJobDto) {
    const jobs = await this.jobModel.find({ title: category.title });
    return jobs;
  }
}
