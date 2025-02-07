import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Image {
  @Prop()
  file: string;
}
const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({
  timestamps: true,
})
export class Clothe {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({
    type: [ImageSchema],
  })
  images: Image[];

  @Prop()
  type: string;

  @Prop()
  season: string[];

  @Prop()
  notes: string;
}
export const ClotheSchema = SchemaFactory.createForClass(Clothe);
