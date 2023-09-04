import { IsNumberString } from "class-validator";

export class ParamCredentialIdDto{
    @IsNumberString()
    id: string
}