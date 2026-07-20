import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LibraryService } from './library.service';
import { DonateBookDto } from './dto/donate-book.dto';

@Controller('books')
export class LibraryController {
  constructor(private libraryService: LibraryService) {}

  @Get()
  @HttpCode(200)
  getBooks() {
    return this.libraryService.getBooks();
  }

  @Get('/:id')
  @HttpCode(200)
  findBook(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.findBook(id);
  }

  @Post(':id/borrow')
  @HttpCode(201)
  borrowBook(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.borrowBook(id);
  }

  @Post('/:id/return')
  @HttpCode(201)
  returnBorrow(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.returnBook(id);
  }

  @Post('/donate')
  @HttpCode(201)
  donateBook(@Body() donateBookDto: DonateBookDto) {
    return {
      msg: 'Gracias por donar:',
      book: this.libraryService.receiveDonation(donateBookDto),
    };
  }
}