import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CreateJwtServiceModule } from './jwt/jwt.module';
import { S3Service } from 'src/aws-s3/aws-s3.service';

@Module({
  imports: [
    CreateJwtServiceModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, S3Service],
})
export class AuthModule {}
