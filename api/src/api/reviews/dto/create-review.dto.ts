import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  outfitId: string;

  @IsString()
  review: string;

  @IsNumber()
  rating: number;
}
