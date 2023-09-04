import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";
import { CreateNoteDto } from "./dtos/create-note.dto";

@Injectable()
export class NotesRepository{
    constructor(private readonly prisma: PrismaService) {}

    findNoteByTitleAndUserId(title: string, userId: number){
        return this.prisma.note.findFirst({
            where: {
                title,
                userId
            }
        })
    }

    insertNote(body: CreateNoteDto, userId: number){
        return this.prisma.note.create({
            data: {
                userId,
                ...body
            }
        })
    }

    findNotesByUserId(userId: number){
        return this.prisma.note.findMany({
            where: { userId }
        })
    }

    findNoteById(id: number){
        return this.prisma.note.findUnique({
            where: { id }
        })
    }

    deleteNoteById(id: number){
        return this.prisma.note.delete({
            where: { id }
        })
    }
}