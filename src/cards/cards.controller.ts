import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'NORMAL')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(+id);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }
  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}