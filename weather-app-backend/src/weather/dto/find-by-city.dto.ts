import { ApiProperty } from '@nestjs/swagger';
import { IsNotBlank } from '../../common/decorators/property/is-not-blank.decorator';

export class FindByCityDto {
  @ApiProperty()
  @IsNotBlank()
  city!: string;
}
