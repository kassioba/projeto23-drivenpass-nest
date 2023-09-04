import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/guards.guard';
import { CredentialsService } from './credentials.service';
import { CreateCredentialsDto } from './dtos/create-credentials.dto';
import { User } from '../decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { ParamCredentialIdDto } from './dtos/param-credential-id.dto';
import { DeleteCredentialDto } from './dtos/delete-credentials.dto';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
    constructor(private readonly credentialsService: CredentialsService) {}

    @Post()
    postCredentials(@Body() body: CreateCredentialsDto, @User() user: PrismaUser){
        return this.credentialsService.postCredentials(body, user)
    }

    @Get()
    getCredentials(@User() user: PrismaUser){
        return this.credentialsService.getCredentials(user.id)
    }

    @Get('/:id')
    getCredentialById(@Param() { id }: ParamCredentialIdDto, @User() user: PrismaUser){
        return this.credentialsService.getCredentialById(+id, user.id)
    }

    @Delete()
    deleteCredentialById(@Body() { credentialId }: DeleteCredentialDto, @User() user: PrismaUser){
        return this.credentialsService.deleteCredentialById(credentialId, user.id)
    }
}
