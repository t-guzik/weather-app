import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponse {
  @ApiProperty()
  id!: number | string;

  constructor(id: number | string) {
    this.id = id;
  }
}
