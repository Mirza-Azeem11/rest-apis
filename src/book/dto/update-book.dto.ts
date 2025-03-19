import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateBookDto {
    @ApiPropertyOptional({
        example: 'The Lord of the Rings',
        description: 'Updated title of the book',
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ example: 2, description: 'Updated author ID' })
    @IsOptional()
    @IsInt()
    author?: number;

    @ApiPropertyOptional({
        example: [3, 4],
        description: 'Updated array of genre IDs',
    })
    @IsOptional()
    @IsArray()
    genres?: number[];

    @ApiPropertyOptional({ example: 7, description: 'Updated publication ID' })
    @IsOptional()
    @IsInt()
    publication?: number;

    @ApiPropertyOptional({
        example: 1954,
        description: 'Updated year of publication',
    })
    @IsOptional()
    @IsInt()
    publicationYear?: number;
}
