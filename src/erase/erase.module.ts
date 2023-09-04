import { Module } from '@nestjs/common';
import { EraseController } from './erase.controller';
import { EraseService } from './erase.service';
import { EraseRepository } from './erase.repository';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EraseController],
  providers: [EraseService, EraseRepository],
  imports: [UsersModule]
})
export class EraseModule {}
