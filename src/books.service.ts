import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

/**
 * Services are a broad category in Nest that cover domain logic and data manipulation
 */

@Injectable()
export class BooksService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  getHello(): string {
    return 'Hello World!';
  }

  async author(id: number) {
    return this.knex
      .select()
      .from('authors')
      .where('authors.id', id)
      .join('books', 'authors.id', 'books.author');
  }

  async authors() {
    return this.knex
      .select()
      .from('authors');
  }

  async book(id: number) {
    const isLoaned = this.knex.raw(`
       CASE WHEN EXISTS (
         SELECT * FROM loans WHERE loans.book = books.id
       )
       THEN 1
       ELSE 0
       END
       AS loaned
    `);

    return this.knex('books')
      .select(
        'books.id AS id',
        'authors.name AS author',
        isLoaned
      )
      .where('books.id', id)
      .join('authors', 'books.author', 'authors.id');
  }

  async loans() {
    return this.knex
      .select()
      .from('loans')
  }

  async returnBook(book: number) {
    return this.knex('loans')
      .where('book', book)
      .delete();
  }

  async borrow(user: number, book: number): Promise<boolean> {
    const insertions = await this.knex('loans').insert({
      book,
      user
    }, ['id']).onConflict('book').ignore()
    return (insertions as unknown[]).length > 0
  }
}
