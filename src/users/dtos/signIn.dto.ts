import { IsNotEmpty } from "class-validator";
import { SignUpDto } from "./signUp.dto";

export class SignInDto extends SignUpDto{
    @IsNotEmpty()
    password: string;
}