import { IsNumberString } from "class-validator";

export class CardParamDto{
    @IsNumberString()
    id: string
}