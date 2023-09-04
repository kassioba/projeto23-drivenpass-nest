import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import Cryptr from 'cryptr';
import { CreateCardDto } from './dtos/create-card.dto';

@Injectable()
export class CardsService {
    private cryptr: Cryptr
    
    constructor(private readonly cardsRepository: CardsRepository){
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.CRYPTR_SECRET)
    }
    
    async postCard(body: CreateCardDto, userId: number) {
        const { password, title } = body
        const checkCard = await this.cardsRepository.findCardByUserIdAndTitle(userId, title)
        
        if(checkCard) throw new ConflictException('Title already in use')
        
        body.password = this.cryptr.encrypt(password)
        
        return await this.cardsRepository.insertCard(body, userId)
    }
    
    async getUserCards(userId: number) {
        const cards = await this.cardsRepository.findUserCards(userId)
        
        cards.forEach(card => card.password = this.cryptr.decrypt(card.password));
        
        return cards
    }
    
    async getCardById(cardId: number, userId: number) {
        const card = await this.cardsRepository.findCardById(cardId)
        
        if(!card) throw new NotFoundException('Card not found')
        
        if(card.userId !== userId) throw new ForbiddenException('User can only access their own cards')
        
        card.password = this.cryptr.decrypt(card.password)

        return card
    }
    
    async deleteCard(cardId: number, userId: number) {
        const card = await this.cardsRepository.findCardById(cardId)
        
        if(!card) throw new NotFoundException('Card not found')
        
        if(card.userId !== userId) throw new ForbiddenException('User can only access their own cards')

        await this.cardsRepository.deleteCardById(cardId)
    }
}
