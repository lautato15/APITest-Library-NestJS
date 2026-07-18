import {
  Body,
  Controller,
  Get,
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
  getBooks() {
    return this.libraryService.getBooks();
  }
  @Get('/:id')
  findBook(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.findBook(id);
  }
  @Post(':id/borrow')
  borrowBook(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.borrowBook(id);
  }
  @Post('/:id/return')
  returnBorrow(@Param('id', ParseIntPipe) id: number) {
    return this.libraryService.returnBook(id);
  }
  @Post('/donate')
  donateBook(@Body() donateBookDto: DonateBookDto) {
    return this.libraryService.receiveDonation(donateBookDto);
  }
}
