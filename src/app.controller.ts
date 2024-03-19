import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/book/:id')
  getBookDetails(@Param('id', ParseIntPipe) id: number) {
    const book = this.appService.bookDetails(id);
    if (!book) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } else {
      return book;
    }
  }

  @Get('/books')
  getBooks() {
    return this.appService.books();
  }

  @Get('/user/:id')
  getUserDetails(@Param('id', ParseIntPipe) id: number) {
    const user = this.appService.userDetails(id)
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } else {
      return user
    }
  }

}
