import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateClotheDto {
  @IsString()
  type: string;

  @IsArray()
  @IsOptional()
  season: string[];

  @IsOptional()
  images: Express.Multer.File[];
}
