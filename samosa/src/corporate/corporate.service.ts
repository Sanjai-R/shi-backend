import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICorporate, ISignup } from './interfaces/corporate.interface';

const decode = (password: string) => {
  return password
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) - 2))
    .join('');
};
@Injectable()
export class CorporateService {
  constructor(
    @InjectModel('Corporate')
    private readonly corporateModel: Model<ICorporate>,
  ) {}

  async SignUp(data: ISignup) {
    const { password, ...rest } = data;
    const decodedPassword = decode(password);
    const hashPassword = '';
    const userData = { ...rest, hashPassword };
    const newUser = new this.corporateModel(userData);
    await newUser.save();
    return {
      success: true,
      message: 'proceed to next step',
    };
  }

  async update(data: ICorporate) {
    const { email, ...rest } = data;
    const dataToUpdated = { ...rest, is_steps_completed: true };
    const res = await this.corporateModel.findOneAndUpdate(
      { email: email },
      dataToUpdated,
      { new: true },
    );
    if (res === null) throw new NotFoundException();
    else return res;
  }
}
