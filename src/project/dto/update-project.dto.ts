import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsString, IsInt} from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsInt()
    sprint?: number;

  

}
