import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { AuthGuard } from '../guards/guards.guard';
import { CreateCardDto } from './dtos/create-card.dto';
import { User } from '../decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { CardParamDto } from './dtos/card-param.dto';
import { DeleteCardDto } from './dtos/delete-card.dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService){}

    @Post()
    postCard(@Body() body: CreateCardDto, @User() user: PrismaUser){
        return this.cardsService.postCard(body, user.id)
    }

    @Get()
    getUserCards(@User() user: PrismaUser){
        return this.cardsService.getUserCards(user.id)
    }

    @Get('/:id')
    getCardById(@Param() { id }: CardParamDto, @User() user: PrismaUser){
        return this.cardsService.getCardById(+id, user.id)
    }

    @Delete()
    deleteCard(@Body() { id }: DeleteCardDto, @User() user: PrismaUser){
        this.cardsService.deleteCard(id, user.id)
    }
}
