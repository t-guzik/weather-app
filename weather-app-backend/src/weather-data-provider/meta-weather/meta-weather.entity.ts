import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonTimestampsEntity } from '../../common/entities/common-timestamps.entity';

@Entity({ name: 'weather' })
export class MetaWeatherEntity extends CommonTimestampsEntity {
  @ApiProperty()
  @PrimaryColumn('text')
  location!: string;

  @ApiProperty()
  @PrimaryColumn('date')
  date!: string;

  @ApiProperty()
  @Column('text')
  state!: string;

  @ApiProperty({ description: 'degrees' })
  @Column('float')
  windDirection!: number;

  @ApiProperty({ description: 'mph' })
  @Column('float')
  windSpeed!: number;

  @ApiProperty({ description: 'mbar' })
  @Column('float', { nullable: true })
  airPressure?: number;

  @ApiProperty({ description: 'percentage' })
  @Column('float')
  humidity!: number;

  @ApiProperty({ description: 'percentage' })
  @Column('int')
  predictability!: number;

  @ApiProperty({ description: 'centigrade' })
  @Column('float', { nullable: true })
  minTemp?: number;

  @ApiProperty({ description: 'centigrade' })
  @Column('float', { nullable: true })
  maxTemp?: number;

  @ApiProperty({ description: 'centigrade' })
  @Column('float', { nullable: true })
  avgTemp?: number;

  @ApiProperty()
  @Column('text')
  iconUrl!: string;
}
