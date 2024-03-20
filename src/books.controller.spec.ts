import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const books: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksController = books.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(booksController.getHello()).toBe('Hello World!');
    });
  });
});
