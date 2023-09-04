import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";

@Injectable()
export class EraseRepository{
    constructor(private readonly prisma: PrismaService){}

    deleteAccount(id: number){
        return this.prisma.user.delete({
            where: { id }
        })
    }
}