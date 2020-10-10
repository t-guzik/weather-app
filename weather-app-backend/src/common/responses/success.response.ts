import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty()
  success: boolean;

  constructor(success: boolean = true) {
    this.success = success;
  }
}
