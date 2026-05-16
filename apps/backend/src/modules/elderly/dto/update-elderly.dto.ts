import { PartialType } from '@nestjs/swagger';
import { CreateElderlyDto } from './create-elderly.dto';

export class UpdateElderlyDto extends PartialType(CreateElderlyDto) {}
