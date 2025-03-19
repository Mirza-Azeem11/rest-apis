import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    create: jest.fn((bookData) => ({ id: 1, ...bookData })),
    findAll: jest.fn(() => [
      {
        id: 1,
        title: 'Test Book',
        author: { id: 1, name: 'Test Author' },
        genres: [{ id: 1, name: 'Fiction' }],
        publication: { id: 1, name: 'Test Publication' },
        publicationYear: 2023,
      },
    ]),
    findOne: jest.fn((id) => ({
      id,
      title: 'Test Book',
      author: { id: 1, name: 'Test Author' },
      genres: [{ id: 1, name: 'Fiction' }],
      publication: { id: 1, name: 'Test Publication' },
      publicationYear: 2023,
    })),
    update: jest.fn((id, updateData) => ({ id, ...updateData })),
    delete: jest.fn((id) => ({ message: `Book with ID ${id} deleted` })),
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
    expect(await controller.create(createDto)).toEqual({ id: 1, ...createDto });
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should get all books', async () => {
    expect(await controller.findAll(1, 10)).toHaveLength(1);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a book by ID', async () => {
    expect(await controller.findOne(1)).toEqual(
        expect.objectContaining({ id: 1 }),
    );
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a book', async () => {
    const updateDto: UpdateBookDto = { title: 'Updated Book' };
    expect(await controller.update(1, updateDto)).toEqual({
      id: 1,
      ...updateDto,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('should delete a book', async () => {
    expect(await controller.remove(1)).toEqual({
      message: 'Book with ID 1 deleted',
    });
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});