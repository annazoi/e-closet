import { InjectModel } from '@nestjs/mongoose';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { Outfit } from 'src/schemas/outfit.schema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Model, Error } from 'mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class OutfitsService {
  constructor(
    @InjectModel(Outfit.name) private outfitModel: Model<Outfit>,
    private s3Service: S3Service,
  ) {}
  async create(userId: string, createOutfitDto: CreateOutfitDto) {
    try {
      const outfit = new this.outfitModel({
        ...createOutfitDto,
        userId,
      });

      await outfit.save();
      return outfit;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  findAll(query: any) {
    try {
      const outfits = this.outfitModel.find({ ...query });
      if (!outfits) {
        throw new ForbiddenException('No outfits found');
      }
      return outfits;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  findOne(id: string) {
    try {
      const outfit = this.outfitModel
        .findById(id)
        .populate('shirt', '-password');
      if (!outfit) {
        throw new ForbiddenException('No outfit found');
      }
      return outfit;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  update(id: number, updateOutfitDto: UpdateOutfitDto) {
    return `This action updates a #${id} outfit`;
  }

  remove(id: number) {
    return `This action removes a #${id} outfit`;
  }
}
