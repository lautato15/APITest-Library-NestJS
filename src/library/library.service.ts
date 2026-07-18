import { Injectable } from '@nestjs/common';
import { Book } from './book.entity';
import { books } from 'src/data/data';
import { DonateBookDto } from './dto/donate-book.dto';

@Injectable()
export class LibraryService {
  private books: Book[] = books;

  getBooks() {
    return this.books;
  }
  findBook(id: number) {
    return this.books.find((book) => book.getId() === id);
  }
  borrowBook(id: number) {
    const book = this.findBook(id);
    if (book && book.borrowBook()) return true;
    return false;
  }
  returnBook(id: number) {
    const book = this.findBook(id);
    if (book && book.returnBook()) return true;
    return false;
  }
  receiveDonation(donateBookDto: DonateBookDto): Book {
    const book = new Book(
      donateBookDto.title,
      this.books.length + 1,
      donateBookDto.author,
      true,
    );
    this.books.push(book);
    return book;
  }
}
