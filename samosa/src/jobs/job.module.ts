import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schema/job.schema';
import { SkillsModule } from 'src/skills/skills.module';
import { StudentModule } from 'src/student/student.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),
    SkillsModule,
    StudentModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
