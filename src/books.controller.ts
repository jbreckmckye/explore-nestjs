import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getHello(): string {
    return this.booksService.getHello();
  }

  @Get('/book/:id')
  getBookDetails(@Param('id', ParseIntPipe) id: number) {
    const book = this.booksService.bookDetails(id);
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } else {
      return book;
    }
  }

  @Get('/books')
  getBooks() {
    return this.booksService.books();
  }

  @Get('/user/:id')
  getUserDetails(@Param('id', ParseIntPipe) id: number) {
    const user = this.booksService.userDetails(id)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } else {
      return user
    }
  }

}
