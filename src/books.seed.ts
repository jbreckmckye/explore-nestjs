import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { inspect } from 'node:util';

@Injectable()
export class BooksSeed {
  private readonly logger = new Logger(BooksSeed.name);

  private async createTables() {
    await this.knex.schema.createTable('authors', table => {
      table.increments('id').primary();
      table.text('name');
    });

    await this.knex.schema.createTable('books', table => {
      table.increments('id').primary();
      table.text('name');
      table.integer('author').unsigned().notNullable();

      table.foreign('author').references('id').inTable('authors');
    });

    await this.knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.text('name');
    });

    await this.knex.schema.createTable('loans', table => {
      table.increments('id').primary();
      table.integer('book').unsigned().notNullable();
      table.integer('user').unsigned().notNullable();

      table.foreign('book').references('id').inTable('books');
      table.foreign('user').references('id').inTable('users');
    })
  }

  private async seedData() {
    await this.knex('authors').insert([
      { name: 'Alice Alison' }, // id=1
      { name: 'Bob Robertson' } // id=2
    ]);

    await this.knex('books').insert([
      { author: 1, name: 'Making fast food from roadkill' }, // id=1
      { author: 2, name: 'Coping with bunions' }, // id=2
      { author: 1, name: 'Surviving food poisoning' } // id=3
    ]);

    await this.knex('users').insert([
      { name: 'jbreckmckye' } // id=1
    ]);

    await this.knex('loans').insert([
      { book: 2, user: 1 }
    ]);
  }

  private async init() {
    this.logger.log('Seeding database for development');

    await this.createTables();
    await this.seedData();

    const authors = await this.knex.select().table('authors');
    const books = await this.knex.select().table('books');
    const users = await this.knex.select().table('users');
    const loans = await this.knex.select().table('loans');

    this.logger.log('Seed complete!', inspect({
      authors,
      books,
      users,
      loans
    }));

  }

  constructor(@InjectConnection() private readonly knex: Knex) {
    this.init();
  }
}
