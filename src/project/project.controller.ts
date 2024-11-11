import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('project')
export class ProjectController {
  constructor( 
    private readonly projectService: ProjectService
  ) {}
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get(':sprint')
  findOne(@Param('sprint') sprint: number) {
    return this.projectService.findOne(sprint);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
