import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/schemas/user.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignUpDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          // new MaxFileSizeValidator({
          //   maxSize: 1000,
          // }),
          // new FileTypeValidator({
          //   fileType: 'image/png',
          // }),
          // new FileTypeValidator({
          //   fileType: 'image/jpeg',
          // }),
          // new FileTypeValidator({
          //   fileType: 'image/jpg',
          // }),
        ],
      }),
    )
    file: Express.Multer.File | undefined,
  ): Promise<any> {
    return this.authService.signup(dto, file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
