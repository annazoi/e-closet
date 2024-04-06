import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOutfitDto {
  @IsArray()
  clothes: string[];

  @IsOptional()
  @IsString()
  colorSchema: string;

  @IsOptional()
  @IsString()
  rating: number;

  @IsOptional()
  @IsString()
  notes: string;
}
