import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  private books = [];

  create(bookData: CreateBookDto) {
    const newBook = { id: this.books.length + 1, ...bookData };
    this.books.push(newBook);
    return newBook;
  }

  findAll(page: number, limit: number, search?: string) {
    let filteredBooks = this.books;

    if (search) {
      filteredBooks = this.books.filter((book) =>
          book.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      total: filteredBooks.length,
      page,
      limit,
      books: filteredBooks.slice(start, end),
    };
  }

  findOne(id: number) {
    return this.books.find((book) => book.id === id);
  }

  update(id: number, updateData: UpdateBookDto) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) return null;

    this.books[bookIndex] = { ...this.books[bookIndex], ...updateData };
    return this.books[bookIndex];
  }

  delete(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
    return { message: 'Book deleted successfully' };
  }
}
