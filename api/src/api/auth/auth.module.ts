import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { CreateJwtServiceModule } from './jwt/jwt.module';
import { S3Service } from 'src/aws-s3/aws-s3.service';
import { ClosetSchema } from 'src/schemas/closet.schema';
import { ClosetService } from '../closet/closet.service';

@Module({
  imports: [
    CreateJwtServiceModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Closet', schema: ClosetSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, S3Service, ClosetService],
})
export class AuthModule {}
