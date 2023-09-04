import { CardType } from "@prisma/client"
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsNumberString, IsString, Length, Matches, Max, Min } from "class-validator"

export class CreateCardDto{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumberString()
    @Length(15, 16)
    cardNumber: string

    @IsNotEmpty()
    @IsString()
    cardName: string

    @IsNotEmpty()
    @IsNumber()
    @Min(100)
    @Max(999)
    cvv: number

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'Expiration date must have MM/YYYY format'
    })
    expirationDate: string

    @IsNotEmpty()
    @IsNumberString()
    password: string

    @IsNotEmpty()
    @IsBoolean()
    isVirtual: boolean

    @IsNotEmpty()
    @IsString()
    @Matches(/(CREDIT|DEBIT|BOTH)/, {
        message: 'Invalid card type'
    })
    cardType: CardType
}