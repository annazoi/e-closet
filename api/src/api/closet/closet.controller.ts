import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClosetService } from './closet.service';
import { CreateClosetDto } from './dto/create-closet.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Closet } from 'src/schemas/closet.schema';

@Controller('closet')
@ApiTags('Closet')
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  // @UseGuards(JwtGuard)
  // @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: Closet })
  // async create(
  //   @Req() req: Express.Request,
  //   @Body() createClosetDto: CreateClosetDto,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {
  //   const { userId } = req.user;

  //   return this.closetService.create(userId, createClosetDto, files);
  // }

  @Get()
  @ApiOkResponse({ type: Closet })
  async findAll(@Query() query: any) {
    return this.closetService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Closet })
  findOne(@Param('id') id: string) {
    return this.closetService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Closet })
  update(@Param('id') id: string, @Body() updateClosetDto: UpdateClosetDto) {
    return this.closetService.update(id, updateClosetDto);
  }

  @Delete(':closetId/images/:imageId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Closet })
  async deleteImage(
    @Param('closetId') closetId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.closetService.deleteImage(closetId, imageId);
  }

  @UseGuards(JwtGuard)
  @Post('/:id/images')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOkResponse({ type: Closet })
  async addImages(
    @Param('id') closetId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.closetService.addImages(closetId, files);
  }

  // @Patch('/:id/images')
  // @UseGuards(JwtGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: Closet })
  // async removeImages(
  //   @Param('id') closetId: string,
  //   @Body() body: RemoveImagesDto,
  // ) {
  //   return this.closetService.removeImages(closetId, body.images);
  // }
}
