import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from '../entities/book.entity';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    create: jest.fn((bookData) => Promise.resolve({ id: 1, ...bookData })),
    findAll: jest.fn().mockResolvedValue([] as Book[]),
    findOne: jest.fn((id) =>
        Promise.resolve({
          id,
          title: 'Test Book',
          author: { id: 1, name: 'Test Author' },
          genres: [{ id: 1, name: 'Fiction' }],
          publication: { id: 1, name: 'Test Publication' },
          publicationYear: 2023,
        }),
    ),
    update: jest.fn((id, updateData) => Promise.resolve({ id, ...updateData })),
    delete: jest.fn((id) => Promise.resolve({ message: `Book with ID ${id} deleted` })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockBookService }],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const createDto: CreateBookDto = {
      title: 'Test Book',
      author: 1,
      genres: [1],
      publication: 1,
      publicationYear: 2023,
    };
    await expect(controller.create(createDto)).resolves.toEqual({ id: 1, ...createDto });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should return a book by ID', async () => {
    const bookId = 1;
    await expect(controller.findOne(bookId)).resolves.toEqual(
        expect.objectContaining({ id: bookId }),
    );
    expect(service.findOne).toHaveBeenCalledWith(bookId);
  });

  it('should update a book', async () => {
    const updateDto: UpdateBookDto = { title: 'Updated Book' };
    await expect(controller.update(1, updateDto)).resolves.toEqual({
      id: 1,
      ...updateDto,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a book', async () => {
    await expect(controller.remove(1)).resolves.toEqual({
      message: 'Book with ID 1 deleted',
    });
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
