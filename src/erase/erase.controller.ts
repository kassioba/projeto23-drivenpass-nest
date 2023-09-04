import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/guards.guard';
import { EraseDto } from './dtos/erase.dto';
import { User } from '../decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
    constructor(private readonly eraseService: EraseService) {}
    
    @Delete()
    deleteAccount(@Body() { password }: EraseDto, @User() user: PrismaUser){
        return this.eraseService.deleteAccount(password, user.id)
    }
}
