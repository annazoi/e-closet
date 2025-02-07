import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Clothe } from './clothe.schema';

@Schema({
  timestamps: true,
})
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Outfit' })
  outfitId: Types.ObjectId;

  @Prop({
    maxlength: 1000,
  })
  review: string;

  @Prop()
  rating?: number;
}
export const reviewSchema = SchemaFactory.createForClass(Review);
