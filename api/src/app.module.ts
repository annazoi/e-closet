import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/users/users.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.UPLOAD_RATE_TTL),
        limit: parseInt(process.env.UPLOAD_RATE_LIMIT),
      },
    ]),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    AuthModule,
    UserModule,
    AwsS3Module,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
