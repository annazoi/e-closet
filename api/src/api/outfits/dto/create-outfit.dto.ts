import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateOutfitDto {
  @IsOptional()
  @IsString()
  head: string;

  @IsString()
  shirt: string;

  @IsString()
  pant: string;

  @IsString()
  shoes: string;

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
