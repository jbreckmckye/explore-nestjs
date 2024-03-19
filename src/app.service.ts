import { Injectable } from '@nestjs/common';

type Author = { id: number, name: string }
type Book = { id: number, author: number, name: string }
type Loan = { id: number, book: number, user: number }
type User = { id: number, name: string }

const data = {
  authors: [
    { id: 1, name: 'Alice Alison' },
    { id: 2, name: 'Bob Robertson' }
  ] as Author[],
  books: [
    { id: 3, author: 1, name: 'Making fast food from roadkill' },
    { id: 4, author: 2, name: 'Coping with bunions' },
    { id: 5, author: 1, name: 'Surviving food poisoning' }
  ] as Book[],
  loans: [
    { id: 105, book: 4, user: 6 }
  ] as Loan[],
  users: [
    { id: 6, name: 'jbreckmckye' },
  ] as User[]
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  author(id: number) {
    return data.authors.find(item => item.id === id);
  }

  bookDetails(id: number) {
    const book = data.books.find(item => item.id === id);
    if (!book) return null;

    const loaned = data.loans.some(item => item.book === id)
    return {
      ...book,
      author: this.author(book.author),
      loaned
    };
  }

  books() {
    return data.books;
  }

  loanDetails(id: number) {
    const loan = data.loans.find(item => item.id === id)
    if (!loan) return null;

    return {
      ...loan,
      book: this.bookDetails(loan.book)
    }
  }

  userDetails(id: number) {
    const user = data.users.find(item => item.id === id);
    if (!user) return null;

    const loans = data.loans
      .filter(item => item.user === id)
      .map(item => this.loanDetails(item.id));

    return {
      ...user,
      loans
    };
  }
}
