import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/edit-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(query: any = {}) {
    try {
      let users = await this.userModel.find(query, { password: 0 });
      return users;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.userModel.findById(id, { password: 0 });
      if (!user) {
        throw new NotFoundException('Could not find User.');
      }
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(userId: string, data: UpdateUserDto) {
    try {
      const updatedUser = (
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          { $set: data },
          { new: true },
        )
      ).toJSON();
      if (!updatedUser) {
        throw new NotFoundException('Could not find User.');
      }
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
