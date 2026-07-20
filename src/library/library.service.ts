import { BadRequestException, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { books } from 'src/data/data';
import { DonateBookDto } from './dto/donate-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibraryService {
  private books: Book[] = books;

  constructor(private prisma: PrismaService) {}

  getBooks() {
    return this.books;
  }

  findBook(id: number) {
    return this.books.find((book) => book.getId() === id);
  }

  borrowBook(id: number) {
    const book = this.findBook(id);
    if (book && book.borrowBook())
      return { msg: 'Aqui esta su libro:', book: book };
    throw new BadRequestException('No se pudo prestar');
  }

  returnBook(id: number) {
    const book = this.findBook(id);
    if (book && book.returnBook())
      return { msg: 'Gracias por devolver:', book: book };
    throw new BadRequestException('No se pudo devolver');
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
