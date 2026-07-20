import { BadRequestException, Injectable } from '@nestjs/common';
import { DonateBookDto } from './dto/donate-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  async getBooks() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async findBook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    return book;
  }

  async borrowBook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (book && book.available) {
      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: {
          available: false,
        },
      });
      return { msg: 'Aqui esta su libro:', book: updatedBook };
    }
    throw new BadRequestException('No se pudo prestar');
  }

  async returnBook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (book && !book.available) {
      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: { available: true },
      });
      return { msg: 'Gracias por devolver:', book: updatedBook };
    }
    throw new BadRequestException('No se pudo devolver');
  }

  async receiveDonation(donateBookDto: DonateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        title: donateBookDto.title,
        author: donateBookDto.author,
        available: true,
      },
    });
    if (book) {
      const books = await this.prisma.book.findMany();
      return books;
    }
  }
}
