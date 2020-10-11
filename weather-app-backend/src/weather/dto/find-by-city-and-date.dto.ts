import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';
import { IsCurrentMonthDate } from '../../common/decorators/property/is-current-month-date.decorator';
import { FindByCityDto } from './find-by-city.dto';

export class FindByCityAndDateDto extends FindByCityDto {
  @ApiProperty({ type: String, format: 'date' })
  @IsCurrentMonthDate()
  @Transform(date => DateTime.fromISO(date))
  date!: DateTime;
}
