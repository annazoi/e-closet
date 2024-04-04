import { Image } from './../../../../../client/src/interfaces/components';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateClosetDto {
  @IsOptional()
  images: Express.Multer.File[];
}
