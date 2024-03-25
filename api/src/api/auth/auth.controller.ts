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
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/schemas/user.schema';
import { CreateClosetDto } from '../closet/dto/create-closet.dto';
import { Closet } from 'src/schemas/closet.schema';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Req() req: Express.Request,
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
    // Call the signup method of AuthService passing additional parameters
    return this.authService.signup(dto, file, createClosetDto, closetFiles);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
