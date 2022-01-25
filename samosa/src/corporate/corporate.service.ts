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
import { ICorporate, ILogin, ISignup } from './interfaces/corporate.interface';

@Injectable()
export class CorporateService {
  constructor(
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
  ) {}

  async SignUp(data: ISignup) {
    const { password, ...rest } = data;
    const decodedPassword = decode(password);
    const hashedPassword = hashPassword(decodedPassword);
    const userData = { ...rest, password: hashedPassword };
    const newUser = new this.corporateModel(userData);
    await newUser.save();
    const token = generateToken(rest.email);
    const user = await this.corporateModel
      .findOne({ email: rest.email })
      .select('-password')
      .exec();
    return {
      success: true,
      token: token,
      data: user,
    };
  }

  async login(data: ILogin) {
    const isVerified = await verifyPassword(
      data.email,
      data.password,
      this.corporateModel,
    );
    if (isVerified) {
      const token = generateToken(data.email);
      const user = await this.corporateModel
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

  async update(data: ICorporate) {
    const { email, ...rest } = data;
    const dataToUpdated = { ...rest, is_steps_completed: true };
    const res = await this.corporateModel
      .findOneAndUpdate({ email: email }, dataToUpdated, { new: true })
      .select('-password');
    if (res === null) throw new NotFoundException();
    else {
      return res;
    }
  }
}
