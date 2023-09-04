import { PrismaService } from "../db/prisma.service";
import { CreateCardDto } from "./dtos/create-card.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CardsRepository{
    constructor(private readonly prisma: PrismaService){}

    insertCard(body: CreateCardDto, userId: number){
        return this.prisma.card.create({
            data: {
                ...body,
                userId
            }
        })
    }

    findCardByUserIdAndTitle(userId: number, title: string){   
        return this.prisma.card.findFirst({
            where: {
                userId,
                title
            }
        })
    }

    findUserCards(userId: number){
        return this.prisma.card.findMany({
            where: { userId }
        })
    }

    findCardById(id: number){
        return this.prisma.card.findUnique({
            where: { id }
        })
    }

    deleteCardById(id: number){
        return this.prisma.card.delete({
            where: { id }
        })
    }
}