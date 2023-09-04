import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repositoriy';
import { CreateCredentialsDto } from './dtos/create-credentials.dto';
import { User as PrismaUser } from '@prisma/client';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
    private cryptr: Cryptr

    constructor(private readonly credentialsRepository: CredentialsRepository) {
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.CRYPTR_SECRET)
    }
    
    async postCredentials(body: CreateCredentialsDto, user: PrismaUser) {
        const { title, password } = body
        
        const checkCredential = await this.credentialsRepository.findCredentialByUserIdAndTitle(user.id, title)
        
        if(checkCredential) throw new ConflictException('There is already a credential with this title')
        
        const encryptedPassword = this.cryptr.encrypt(password)

        return await this.credentialsRepository.insertCredential(body, user.id, encryptedPassword)
    }
   
    async getCredentials(userId: number) {
        const credentials = await this.credentialsRepository.findUserCredentials(userId)

        credentials.forEach(cred => {
            cred.password = this.cryptr.decrypt(cred.password)
        })

        return credentials
    }
    
    async getCredentialById(credentialId: number, userId: number){
        const credential = await this.credentialsRepository.findCredentialById(credentialId)
        
        if(!credential) throw new NotFoundException('Credential not found')
        
        if(credential.userId !== userId) throw new ForbiddenException('User can only access their own credentials')
        
        credential.password = this.cryptr.decrypt(credential.password)
        
        return credential
    }
    
    async deleteCredentialById(credentialId: number, userId: number) {
        const credential = await this.credentialsRepository.findCredentialById(credentialId)
        
        if(!credential) throw new NotFoundException('Credential not found')
        
        if(credential.userId !== userId) throw new ForbiddenException('User can only delete their own credentials')

        await this.credentialsRepository.deleteCredentialById(credentialId)
    }
}
