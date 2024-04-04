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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OutfitsService } from './outfits.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';
import { JwtGuard } from '../auth/guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Outfit } from 'src/schemas/outfit.schema';

@Controller('outfits')
@ApiTags('Outfits')
export class OutfitsController {
  constructor(private readonly outfitsService: OutfitsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  @ApiBearerAuth()
  @ApiOkResponse({ type: Outfit })
  async create(
    @Req() req: Express.Request,
    @Body() createOutfitDto: CreateOutfitDto,
  ) {
    const { userId } = req.user;

    return this.outfitsService.create(userId, createOutfitDto);
  }

  @Get()
  @ApiOkResponse({ type: Outfit })
  async findAll(@Query() query: any, @Req() req: Express.Request) {
    return this.outfitsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outfitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutfitDto: UpdateOutfitDto) {
    return this.outfitsService.update(+id, updateOutfitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outfitsService.remove(+id);
  }
}
