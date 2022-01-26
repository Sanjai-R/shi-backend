import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { CorporateModule } from './corporate/corporate.module';
import { JobModule } from './jobs/job.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://riyaz:popz@cluster0.ivmv0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    StudentModule,
    CorporateModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
