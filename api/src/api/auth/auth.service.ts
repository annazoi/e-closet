import {
  ForbiddenException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Model, Error } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Closet } from 'src/schemas/closet.schema';
import { InjectModel } from '@nestjs/mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { CreateJwtService } from './jwt/jwt.service';
import { CreateClosetDto } from '../closet/dto/create-closet.dto';
import { ClosetService } from '../closet/closet.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Closet.name)
    private closetModel: Model<Closet>,
    private s3Service: S3Service,
    private jwt: CreateJwtService,
    private closetService: ClosetService,
  ) {}

  async signup(
    dto: SignUpDto,
    file: Express.Multer.File | undefined,
    createClosetDto: CreateClosetDto,
  ) {
    const existingUser = await this.userModel.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('Credentials taken');
    }

    let avatarUrl = undefined;
    if (file) {
      avatarUrl = await this.s3Service.uploadFile(file);
    }

    const hash = await argon.hash(dto.password);

    try {
      const user = new this.userModel({
        ...dto,
        avatar: avatarUrl,
        password: hash,
      });
      await user.save();

      const token = await this.jwt.signToken({
        userId: user._id,
      });

      const { password, ...rest } = user.toJSON();

      const closet = await this.closetService.create(user.id, createClosetDto);

      return {
        token,
        user: rest,
        closet,
      };
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async signin(data: SignInDto) {
    const user = await this.userModel.findOne({
      email: data.email,
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatch = await argon.verify(user.password, data.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const token = await this.jwt.signToken({
      userId: user.id,
    });

    const { password, ...rest } = user.toJSON();

    return {
      token: token,
      user: rest,
    };
  }
}
