import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generateToken } from 'src/utils/auth.utils';
import { decode } from 'src/utils/decoding.utils';
import { hashPassword, verifyPassword } from 'src/utils/hashing';
import { IStudent, ILogin, ISignup } from './interfaces/student.interface';

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
    console.log(newUser);
    return {
      success: true,
      message: 'proceed to next step',
    };
  }

  async login(data: ILogin) {
    const isVerified = await verifyPassword(
      data.email,
      data.password,
      this.studentModel,
    );
    if (isVerified) {
      const token = generateToken(data.email);
      return {
        success: true,
        token: token,
      };
    } else {
      throw new ForbiddenException();
    }
  }
}
