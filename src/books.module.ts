import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksSeed } from './books.seed';

/**
 * Module ties together a segment of the application, including DI wiring
 * Nest assumes modules are vertically aligned but they don't have to be fully self-contained
 */

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
