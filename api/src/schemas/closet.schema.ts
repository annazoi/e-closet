import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

@Schema()
export class Image {
  @Prop()
  file: string;

  @Prop()
  type?: string;

  @Prop()
  season?: string[];
}
const ImageSchema = SchemaFactory.createForClass(Image);

@Schema({
  timestamps: true,
})
export class Closet {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'The images of the user',
    format: 'string',
  })
  @Prop({
    type: [ImageSchema],
  })
  images: Image[];
}

export const ClosetSchema = SchemaFactory.createForClass(Closet);
