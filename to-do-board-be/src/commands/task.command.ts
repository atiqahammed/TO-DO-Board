import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class TaskCommand {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public title: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public description: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public expiryDate: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public id?: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    public categoryId: string;
}
