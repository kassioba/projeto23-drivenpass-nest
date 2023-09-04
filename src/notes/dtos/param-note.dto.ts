import { IsNumberString } from "class-validator";

export class ParamNoteDto{
    @IsNumberString()
    id: string
}