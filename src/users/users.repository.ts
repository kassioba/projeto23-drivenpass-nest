import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersRepository{
    
    private SALT = 10;

    constructor(private readonly prisma: PrismaService) {}

    selectUserByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    insertUser({ email, password }){
        return this.prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, this.SALT)
            }
        })
    }

    selectUserById(id: number){
        return this.prisma.user.findUnique({
            where: { id }
        })
    }
}