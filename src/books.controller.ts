import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { LoanDto, ReturnDto } from './loan.dto';

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

  @Get('/loans')
  getLoans() {
    return this.booksService.loans();
  }

  @Post('/loan')
  async borrowBook(
    @Body() payload: LoanDto
  ) {
    const [ inserted ] = await this.booksService.borrow(payload.user, payload.book);
    if (!inserted) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    } else {
      return inserted
    }
  }

  @Post('/return')
  async returnBook(
    @Body() payload: ReturnDto
  ) {
    return this.booksService.returnBook(payload.book)
  }
}
