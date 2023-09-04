import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateCredentialsDto{
    @IsNotEmpty()
    @IsUrl()
    url: string

    @IsNotEmpty()
    @IsString()   
    username: string
 
    @IsNotEmpty()
    @IsString()   
    password: string
    
    @IsNotEmpty()
    @IsString()   
    title: string
}