import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignUpDto } from './dtos/signUp.dto';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dtos/signIn.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    private EXPIRATION_TIME = '1 day'
    private ISSUER = 'Kássio'
    private AUDIENCE = 'users'

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService) {}
    
    async signUp(user: SignUpDto) {
        const { email } = user
        
        const checkEmail = await this.usersRepository.selectUserByEmail(email)
        
        if(checkEmail) throw new ConflictException('Email already registered.')
        
        return await this.usersRepository.insertUser(user)
    }
    
    async signIn(userInfo: SignInDto) {
        const { email, password } = userInfo
        const user = await this.usersRepository.selectUserByEmail(email)

        if(!user) throw new UnauthorizedException('Email or password not valid.')

        const validatePassword = await bcrypt.compare(password, user?.password)
        
        if(!validatePassword) throw new UnauthorizedException('Email or password not valid.')

        const token = this.createToken(user)

        return { token }
    }
    
    createToken({ id, email }: User) {
        return this.jwtService.sign({email}, {
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })
    }

    checkToken(token: string){
        return this.jwtService.verify(token, {
            audience: this.AUDIENCE,
            issuer: this.ISSUER
        })
    }
}
