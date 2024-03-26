import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClosetDto } from './dto/create-closet.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { Model, Error } from 'mongoose';
import { Closet } from 'src/schemas/closet.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClosetService {
  constructor(
    @InjectModel(Closet.name)
    private closetModel: Model<Closet>,
    private s3Service: S3Service,
  ) {}
  async create(userId: string, createClosetDto: CreateClosetDto) {
    try {
      const closet = new this.closetModel({
        ...createClosetDto,
        userId,
      });

      await closet.save();
      return closet;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async findAll(query: any) {
    try {
      const closets = await this.closetModel
        .find({ ...query })
        .populate('userId', '-password');
      if (!closets || closets.length === 0) {
        throw new ForbiddenException('No closets found');
      }
      return closets;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const closet = await this.closetModel
        .findById(id)
        .populate('userId', '-password');
      if (!closet) {
        throw new ForbiddenException('No closet found');
      }
      return closet;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async update(id: string, updateClosetDto: UpdateClosetDto) {
    try {
      const upddatedCloset = await this.closetModel.findOneAndUpdate(
        { _id: id },
        { $set: updateClosetDto },
        { new: true },
      );
      if (!upddatedCloset) {
        throw new ForbiddenException('No closet found');
      }
      return upddatedCloset;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteImage(closetId: string, imageId: string) {
    try {
      const closet = await this.closetModel.findById(closetId);
      if (!closet) {
        throw new NotFoundException('No closet found');
      }

      const updatedImages = closet.images.filter(
        (image: any) => image._id.toString() !== imageId,
      );

      closet.images = updatedImages;

      await closet.save();

      return closet.populate('userId', '-password');
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  async addImages(id: string, files: Express.Multer.File[]) {
    try {
      const closet = await this.closetModel.findById(id);
      if (!closet) {
        throw new NotFoundException('No closet found');
      }

      const images = [];
      for (let i = 0; i < files?.length; i++) {
        const uploadedFileUrl = await this.s3Service.uploadFile(files[i]);
        images.push({
          file: uploadedFileUrl,
        });
      }

      closet.images.push(...images);

      await closet.save();

      return closet.populate('userId', '-password');
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
}

// async removeImages(closetId: string, images: string[]) {
//   try {
//     const closet = await this.closetModel.findById(closetId);
//     if (!closet) {
//       throw new NotFoundException('No closet found');
//     }

//     const updatedImages = closet.images.filter(
//       (image: any) => !images.includes(image._id.toString()),
//     );

//     closet.images = updatedImages;

//     return closet.populate('userId', '-password');
//   } catch (error) {
//     if (error instanceof Error.ValidationError) {
//       throw new ForbiddenException(error.message);
//     }
//     throw error;
//   }
// }
