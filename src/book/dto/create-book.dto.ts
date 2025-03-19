import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsInt, IsString} from "class-validator";

export class CreateBookDto {
    @ApiProperty({ example: 'The Hobbit', description: 'Title of the book' })
    @IsString()
    title: string;

    @ApiProperty({ example: 1, description: 'ID of the author' })
    @IsInt()
    author: number;

    @ApiProperty({ example: [1, 2], description: 'Array of genre IDs' })
    @IsArray()
    genres: number[];

    @ApiProperty({ example: 5, description: 'ID of the publication' })
    @IsInt()
    publication: number;

    @ApiProperty({ example: 1937, description: 'Year of publication' })
    @IsInt()
    publicationYear: number;
}
