import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksSeed } from './books.seed';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'better-sqlite3',
        connection: {
          filename: ':memory:',
        },
      }
    })
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksSeed],
})
export class BooksModule {}
