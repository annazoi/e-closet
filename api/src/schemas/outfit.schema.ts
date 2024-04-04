import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Outfit {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clothe' })
  head?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clothe' })
  shirt: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clothe' })
  pant: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Clothe' })
  shoes: Types.ObjectId;

  @Prop()
  colorSchema?: string;

  @Prop()
  rating?: number;

  @Prop()
  notes?: string;
}
export const OutfitSchema = SchemaFactory.createForClass(Outfit);
