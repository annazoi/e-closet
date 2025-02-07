import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Clothe } from 'src/schemas/clothe.schema';
import { JwtGuard } from '../auth/guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOkResponse({ type: Clothe })
  create(
    @Req() req: Express.Request,
    @Body() createClotheDto: CreateClotheDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { userId } = req.user;
    return this.clothesService.create(userId, createClotheDto, files);
  }

  @Get()
  @ApiOkResponse({ type: Clothe })
  async findAll(@Query() query: any, @Req() req: Express.Request) {
    return this.clothesService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Clothe })
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(id);
  }
}
