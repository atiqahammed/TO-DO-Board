import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class RefreshTokenCommand {
    @ApiProperty()
    @IsNotEmpty()
    public refreshToken: string;
}
