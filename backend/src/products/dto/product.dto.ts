import * as sanitizeHtml from 'sanitize-html';
import { parse, isValid, format } from 'date-fns';
import { escape } from 'sqlstring';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ProductDTO.sanitizeName(value))
  name: string;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value.replace(/[^0-9.]/g, '')))
  price: number;

  @IsNotEmpty()
  @Transform(({ value }) => ProductDTO.normalizeDate(value))
  expiration: string;

  private static sanitizeName(value: string): string {
    if (!value || typeof value !== 'string') return '';

    let cleanedName = sanitizeHtml(value.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });

    cleanedName = escape(cleanedName).replace(/^'|'$/g, '');
    cleanedName = cleanedName.replace(/[^a-zA-Z0-9\s#-]/g, '');
    cleanedName = cleanedName.replace(/\s+/g, ' ').trim();

    return cleanedName.substring(0, 255);
  }

  private static normalizeDate(value: string): string {
    if (!value || typeof value !== 'string') return '';

    let parsedDate = parse(value, 'yyyy-MM-dd', new Date());

    if (!isValid(parsedDate))
      parsedDate = parse(value, 'MM/dd/yyyy', new Date());

    return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
  }
}
