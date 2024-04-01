import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop({
    type: [ImageSchema],
  })
  images: Image[];

  @Prop()
  type: string;

  @Prop()
  season: string[];
}
const ClotheSchema = SchemaFactory.createForClass(Clothe);

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
