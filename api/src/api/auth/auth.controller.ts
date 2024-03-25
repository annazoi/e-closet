import { ClosetService } from './../closet/closet.service';
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
  ParseFilePipe,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/schemas/user.schema';
import { CreateClosetDto } from '../closet/dto/create-closet.dto';

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
    @Body() createClosetDto: CreateClosetDto,
    @UploadedFiles() closetFiles: Array<Express.Multer.File>,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [],
      }),
    )
    file: Express.Multer.File | undefined,
  ): Promise<any> {
    return this.authService.signup(dto, file, createClosetDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
