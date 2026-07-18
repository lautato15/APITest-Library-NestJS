import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
export class DonateBookDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title!: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  author!: string;
}
