import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CategoryCommand {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public name: string;
}
