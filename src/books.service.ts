import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

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
      .from('authors')
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
    `)

    return this.knex('books')
      .select(
        'books.id AS id',
        'authors.name AS author',
        isLoaned
      )
      .where('books.id', id)
      .join('authors', 'books.author', 'authors.id')

  }

}
