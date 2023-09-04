import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { AuthGuard } from '../guards/guards.guard';
import { User } from '../decorators/user.decorator';
import { User as PrismaUser } from '@prisma/client';
import { ParamNoteDto } from './dtos/param-note.dto';
import { DeleteNoteDto } from './dtos/delete-note.dto';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    postNote(@Body() body: CreateNoteDto, @User() user: PrismaUser){
        return this.notesService.postNote(body, user.id)
    }

    @Get()
    getUserNotes(@User() user: PrismaUser){
        return this.notesService.getUserNotes(user.id)
    }

    @Get('/:id')
    getNoteById(@Param() { id }: ParamNoteDto, @User() user: PrismaUser){
        return this.notesService.getNoteById(+id, user.id)
    }

    @Delete()
    deleteNoteById(@Body() { noteId }: DeleteNoteDto, @User() user: PrismaUser){
        return this.notesService.deleteNoteById(noteId, user.id)
    }
}
