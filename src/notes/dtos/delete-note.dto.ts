import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteNoteDto{
    @IsNotEmpty()
    @IsNumber()
    noteId: number
}