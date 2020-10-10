import { classToPlain, Transform } from 'class-transformer';

/**
 * Should be used to correctly transform entity or entities nested in objects (like here { data: Entity[] }, because ClassSerializer only transform
 * directly passed Entity or Entity[] https://stackoverflow.com/questions/54652415/nestjs-response-serialization-with-array-of-objects
 */
export class PaginatedResponse<T> {
  @Transform((value: T[]) => classToPlain(value))
  data: T[];

  @Transform((value: string | number) => +value)
  total: number;

  constructor(data: T[], totalCount: number) {
    this.data = data;
    this.total = totalCount;
  }
}
