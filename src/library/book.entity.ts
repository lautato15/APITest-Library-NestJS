export class Book {
  private title: string;
  private id: number;
  private author: string;
  private available: boolean;

  constructor(title: string, id: number, author: string, available: boolean) {
    this.title = title;
    this.id = id;
    this.author = author;
    this.available = available;
  }
  borrowBook(): boolean {
    if (this.available) {
      this.available = false;
      return true;
    }
    return false;
  }
  returnBook(): boolean {
    if (!this.available) {
      this.available = true;
      return true;
    }
    return false;
  }
  getId(): number {
    return this.id;
  }
}
