import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardsRepository } from './cards.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  imports: [UsersModule]
})
export class CardsModule {}
