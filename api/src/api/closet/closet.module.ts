import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { ClosetSchema } from './../../schemas/closet.schema';
import { ClosetController } from './closet.controller';
import { ClosetService } from './closet.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Closet', schema: ClosetSchema }]),
  ],
  exports: [ClosetService],
  controllers: [ClosetController],
  providers: [ClosetService, S3Service],
})
export class ClosetModule {}
