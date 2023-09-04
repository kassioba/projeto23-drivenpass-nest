import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseRepository } from './erase.repository';
import * as bcrypt from 'bcrypt'
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class EraseService {
    constructor(private readonly eraseRepository: EraseRepository,
                private readonly userRepository: UsersRepository) {}
    
    async deleteAccount(password: string, userId: number) {
        const user = await this.userRepository.selectUserById(userId)
        
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword) throw new UnauthorizedException('aaa')
        
        await this.eraseRepository.deleteAccount(userId)
    }
}
