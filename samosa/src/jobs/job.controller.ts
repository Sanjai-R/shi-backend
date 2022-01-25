import { Body, Controller, Get, Post, Put, Query, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto, UpdateJobDto, CategoryJobDto } from './dto/job.dto';
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get('/getalljobs')
  getalljobs() {
    return this.jobService.getAllJobs();
  }

  @Get('/getJobByCategory')
  getJobByCategory(@Query() params: CategoryJobDto) {
    console.log(params);
    return this.jobService.getJobByCategory(params);
  }

  @Post('/createJob')
  createJob(@Body() data: JobDto) {
    return this.jobService.createJob(data);
  }

  @Put('/updateJob')
  updateJob(@Body() data: UpdateJobDto) {
    return this.jobService.updateJob(data);
  }

  @Put('/closeJob')
  closeJob(@Body() data: UpdateJobDto) {
    return this.jobService.closeJob(data);
  }
}