import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCardDto{
    @IsNotEmpty()
    @IsNumber()
    id: number
}