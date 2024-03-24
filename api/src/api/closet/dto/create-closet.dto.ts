import { IsArray, IsOptional } from 'class-validator';

export class CreateClosetDto {
  @IsOptional()
  images: Express.Multer.File[];
}
export class RemoveImagesDto {
  @IsArray()
  images: string[];
}
