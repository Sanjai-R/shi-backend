import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateToken } from 'src/utils/auth.utils';
import { decode } from 'src/utils/decoding.utils';
import { hashPassword, verifyPassword } from 'src/utils/hashing';
import {
  IStudent,
  ILogin,
  ISignup,
  IParser,
} from './interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<IStudent>,
  ) {}

  async SignUp(data: ISignup) {
    const { password, ...rest } = data;
    const decodedPassword = decode(password);
    const hashedPassword = hashPassword(decodedPassword);
    const userData = { ...rest, password: hashedPassword };
    const newUser = new this.studentModel(userData);
    await newUser.save();
    const token = generateToken(rest.email);
    const user = await this.studentModel
      .findOne({ email: rest.email })
      .select('-password')
      .exec();
    return {
      success: true,
      token: token,
      data: user,
    };
  }

  async login(data: ILogin): Promise<any> {
    const isVerified = await verifyPassword(
      data.email,
      data.password,
      this.studentModel,
    );
    if (isVerified) {
      const token = generateToken(data.email);
      const user = await this.studentModel
        .findOne({ email: data.email })
        .select('-password')
        .exec();
      return {
        success: true,
        token: token,
        data: user,
      };
    } else {
      throw new ForbiddenException();
    }
  }

  async update(data: IStudent) {
    const name = data.name;
    const updatedData = { ...data, is_steps_completed: true };
    const res = await this.studentModel.findOneAndUpdate(
      { name },
      updatedData,
      { new: true },
    );
    if (res === null) throw new NotFoundException();
    else {
      return res;
    }
  }
  async parser(data: IParser) {
    global.Publisher.publish(
      'get-resume-from-node',
      JSON.stringify({
        filename: data.file_name,
        blob: data.data_url,
      }),
    );
    let flag = false;
    let parseData = {};
    await sleep(15000);
    function sleep(ms: number) {
      return new Promise((resolve) => {
        global.Subscriber.on('message', (channel, message) => {
          parseData = JSON.parse(message);
          flag = true;
          resolve(100);
        });
        setTimeout(resolve, ms);
      });
    }
    if (flag) {
      return {
        success: true,
        parse_data: parseData['parse_data'],
      };
    } else {
      throw new RequestTimeoutException();
    }
  }
}
