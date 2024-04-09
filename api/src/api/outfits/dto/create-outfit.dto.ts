import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOutfitDto {
  @IsArray()
  clothes: string[];

  @IsOptional()
  @IsString()
  colorScheme: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  notes: string;

  @IsString()
  type: string;
}
