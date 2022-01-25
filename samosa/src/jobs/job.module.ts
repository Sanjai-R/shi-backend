import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schema/job.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
