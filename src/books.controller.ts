import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getHello(): string {
    return this.booksService.getHello();
  }

  @Get('/authors')
  getAuthors() {
    return this.booksService.authors();
  }

  @Get('/author/:id')
  getAuthorDetails(@Param('id') id: string) {
    // Parameters come as strings...
    const idNumber = parseInt(id, 10);
    return this.booksService.author(idNumber);
  }

  @Get('/book/:id')
  async getBookDetails(
    @Param('id', ParseIntPipe) id: number // The pipe does the parsing for us
  ) {
    const result = await this.booksService.book(id) as Record<string, unknown>[]
    if (result.length === 0) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    } else {
      return result[0]
    }
  }

  // @Get('/user/:id')
  // getUserDetails(@Param('id', ParseIntPipe) id: number) {
  //   const user = this.booksService.userDetails(id)
  //   if (!user) {
  //     throw new HttpException('Not found', HttpStatus.NOT_FOUND)
  //   } else {
  //     return user
  //   }
  // }

}
