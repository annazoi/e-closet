import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  age?: number;

  @Prop()
  avatar?: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
