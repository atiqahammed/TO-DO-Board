import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginCommand {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public password: string;
}
