import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignupCommand {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public password: string;
}
