import { Module } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { Clothe, ClotheSchema } from 'src/schemas/clothe.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Clothe', schema: ClotheSchema }]),
  ],
  exports: [ClothesService],
  controllers: [ClothesController],
  providers: [ClothesService, S3Service],
})
export class ClothesModule {}
