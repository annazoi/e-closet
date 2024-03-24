import { PartialType } from '@nestjs/swagger';
import { CreateClosetDto } from './create-closet.dto';

export class UpdateClosetDto extends PartialType(CreateClosetDto) {}
