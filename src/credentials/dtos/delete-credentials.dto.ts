import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteCredentialDto{
    @IsNotEmpty()
    @IsNumber()
    credentialId: number
}