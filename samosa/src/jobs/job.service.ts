import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JobInterface } from './interfaces/job.interface';
import { JobDto, UpdateJobDto, CategoryJobDto } from './dto/job.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { sendNotification } from 'src/utils/firebase-admin';
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
      .select('_id device_id');

    const recomended_candidates_id = recomended_candidates.map(
      (student) => student._id,
    );
    const deviceTokens: string[] = recomended_candidates.map(
      (student) => student.device_id,
    );

    const _id = new Types.ObjectId();

    const InsertData = {
      _id,
      ...data,
      _required_skills: _required_skills_unique,
      recommended_candidates: recomended_candidates_id,
    };

    const newJob = new this.jobModel(InsertData);
    await newJob.save();
    await this.studentModel.updateMany(
      { _id: recomended_candidates_id },
      {
        $push: { recommended_jobs: _id },
      },
    );
    sendNotification(
      deviceTokens,
      `https://localhost:3000/jobs/${_id}`,
      `${data.title} job is posted now`,
    );
    return {
      success: true,
      message: 'proceed to next step',
      data: newJob,
    };
  }

  async updateJob(data: UpdateJobDto) {
    const { _id, ...rest } = data;
    const res = await this.jobModel.findOneAndUpdate({ _id: _id }, rest);
    if (res == null) throw new NotFoundException();
    return {
      success: true,
    };
  }

  async getAllJobs() {
    const jobs = await this.jobModel
      .find()
      .sort([['date_posted', -1]])
      .populate({
        path: 'posted_by',
        select: 'company_name company_logo',
      })
      .select('_id title description location is_closed');
    return jobs;
  }
  async getJobsById(id: string) {
    const data = await (
      await this.jobModel.findOne({ _id: id })
    ).populate({
      path: 'posted_by',
      select:
        'company_name company_address mobile_number company_website company_logo about why_us',
    });
    return data;
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

  async getTotalJobs(id: string) {
    const activeJobs = await this.jobModel
      .find({ posted_by: id, is_closed: false })
      .count();
    const closedJobs = await this.jobModel
      .find({ posted_by: id, is_closed: true })
      .count();
    return {
      success: true,
      total_jobs: activeJobs + closedJobs,
      active_jobs: activeJobs,
      closed_jobs: closedJobs,
    };
  }

  async getJobByCategory(category: CategoryJobDto) {
    const jobs = await this.jobModel.find({ title: category.title });
    return jobs;
  }
}
