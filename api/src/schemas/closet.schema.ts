import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Clothe, ClotheSchema } from './clothe.schema';

@Schema({
  timestamps: true,
})
export class Closet {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: [ClotheSchema] })
  clothes: Clothe[];

  // @Prop({
  //   type: [ImageSchema],
  // })
  // images: Image[];
}

export const ClosetSchema = SchemaFactory.createForClass(Closet);
