import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { EraseModule } from './erase/erase.module';

@Module({
  imports: [UsersModule, PrismaModule, CredentialsModule, NotesModule, CardsModule, EraseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
