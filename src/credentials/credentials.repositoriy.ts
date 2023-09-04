import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";
import { CreateCredentialsDto } from "./dtos/create-credentials.dto";



@Injectable()
export class CredentialsRepository{
    


    constructor(private readonly prisma: PrismaService) {
        
    }

    findCredentialByUserIdAndTitle(userId: number, title: string){
        return this.prisma.credential.findFirst({
            where: {
                userId,
                title
            }
        })
    }

    insertCredential({ title, url, username, password }: CreateCredentialsDto, userId: number, encryptedPassword: string){
        
        
        return this.prisma.credential.create({
            data: {
                userId,
                title,
                url,
                username,
                password: encryptedPassword
            }
        })
    }

    findUserCredentials(userId: number){
        return this.prisma.credential.findMany({
            where: { userId }
        })
    }

    findCredentialById(id: number){
        return this.prisma.credential.findUnique({
            where: { id }
        })
    }

    deleteCredentialById(id: number){
        return this.prisma.credential.delete({
            where: { id }
        })
    }
}