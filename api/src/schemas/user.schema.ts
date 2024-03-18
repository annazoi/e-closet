import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    description: 'The username of the user',
    format: 'string',
  })
  @Prop()
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    format: 'string',
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: 'The age of the user',
    format: 'number',
  })
  @Prop()
  age: string;

  @ApiProperty({
    description: 'The password of the user',
    format: 'string',
  })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
