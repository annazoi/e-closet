import { Module } from '@nestjs/common';
import { OutfitsService } from './outfits.service';
import { OutfitsController } from './outfits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OutfitSchema } from 'src/schemas/outfit.schema';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Outfit', schema: OutfitSchema }]),
    // AwsS3Module,
  ],
  exports: [OutfitsService],
  controllers: [OutfitsController],
  providers: [OutfitsService, S3Service],
})
export class OutfitsModule {}
