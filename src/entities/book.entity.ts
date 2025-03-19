import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';
import { Publication } from './publication.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @ManyToOne(() => Publication, (publication) => publication.books)
    publication: Publication;

    @Column()
    publicationYear: number;
}
