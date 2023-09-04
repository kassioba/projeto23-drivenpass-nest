import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/signUp.dto';
import { SignInDto } from './dtos/signIn.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('sign-up')
    signUp(@Body() body: SignUpDto){
        return this.usersService.signUp(body)
    }

    @Post('sign-in')
    signIn(@Body() body: SignInDto){
        return this.usersService.signIn(body)
    }
}