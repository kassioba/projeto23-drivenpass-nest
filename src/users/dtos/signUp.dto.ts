import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator"

export class SignUpDto{
    @IsNotEmpty()  
    @IsEmail()
    email: string
 
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 10
    })  
    password: string
}