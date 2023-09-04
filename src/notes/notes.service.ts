import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dtos/create-note.dto';

@Injectable()
export class NotesService {
    constructor(private readonly notesRepository: NotesRepository) {}
    
    async postNote(body: CreateNoteDto, userId: number) {
        const { title } = body
        
        const checkNote = await this.notesRepository.findNoteByTitleAndUserId(title, userId)
        
        if(checkNote) throw new ConflictException('There is already a note with this title')
        
        return await this.notesRepository.insertNote(body, userId)
    }
    
    async getUserNotes(userId: number) {
        return await this.notesRepository.findNotesByUserId(userId)
    }
    
    async getNoteById(noteId: number, userId: number) {
        const note = await this.notesRepository.findNoteById(noteId)
        
        if(!note) throw new NotFoundException('Note not found')
        
        if(note.userId !== userId) throw new ForbiddenException('User can only access their own notes')
        
        return note
    }
    
    async deleteNoteById(noteId: number, userId: number) {
        const note = await this.notesRepository.findNoteById(noteId)
        
        if(!note) throw new NotFoundException('Note not found')
        
        if(note.userId !== userId) throw new ForbiddenException('User can only delete their own notes')

        await this.notesRepository.deleteNoteById(noteId)
    }
}
