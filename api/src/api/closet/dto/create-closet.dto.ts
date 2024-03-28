import { Image } from './../../../../../client/src/interfaces/components';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateClosetDto {
  @IsOptional()
  images: Express.Multer.File[];
}
export class RemoveImagesDto {
  @IsArray()
  images: string[];
}

// export class ImageDto {
//   @IsArray()
//   image: Image;

//   @IsString()
//   @IsOptional()
//   type: string;

//   @IsArray()
//   @IsOptional()
//   season: string[];
// }
