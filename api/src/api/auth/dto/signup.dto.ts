import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsNumberOrString } from 'src/validators/isNumberOrString';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Validate(IsNumberOrString)
  @IsOptional()
  age: string;

  @IsOptional()
  avatar: any;
}
