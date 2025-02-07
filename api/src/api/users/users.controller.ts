import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  ForbiddenException,
  Query,
  Req,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/edit-user.dto';
import { JwtGuard } from '../auth/guard';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/schemas/user.schema';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @ApiOkResponse({ type: [User] })
  @ApiBearerAuth()
  findAll(@Req() req: Express.Request, @Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
