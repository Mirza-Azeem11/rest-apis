import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode, UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiOkResponse, ApiBearerAuth,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from "../auth/guards/local-auth.guard";


@ApiTags('Book') // Groups in Swagger
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Book registration' })
  @ApiOkResponse()
  @HttpCode(201)
  @Post('create_book')
  create(@Body() bookData: CreateBookDto) {
    return this.bookService.create(bookData);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'Hobbit',
  })
  findAll(
      @Query('page', ParseIntPipe) page: number = 1,
      @Query('limit', ParseIntPipe) limit: number = 10,
      @Query('search') search?: string,
  ) {
    return this.bookService.findAll(page, limit, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Put(':id')
  update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateData: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }
}
