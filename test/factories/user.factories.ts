import { PrismaService } from "src/db/prisma.service";
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from "@prisma/client";

export class UsersFactories{
    private SALT = 10
    private EXPIRATION_TIME = '1 day'
    private ISSUER = 'Kássio'
    private AUDIENCE = 'users'

    constructor(private readonly prisma: PrismaService,
                private readonly jwtService: JwtService){}

    createUser(email?: string, password?: string){
        return this.prisma.user.create({
            data: {
                email: email || faker.internet.email(),
                password: bcrypt.hashSync(password, this.SALT) ||  bcrypt.hashSync('Senh@F0rt3', this.SALT)
            }
        })
    }

    async generateValidToken(secret: string, user?: User){
        const { email, id } = await this.createUser(user?.email || faker.internet.email(), user?.password || 'Senh@F0rt3')

        return this.jwtService.sign({email}, {
            secret,
            expiresIn: this.EXPIRATION_TIME,
            subject: String(id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE
        })
    }
}