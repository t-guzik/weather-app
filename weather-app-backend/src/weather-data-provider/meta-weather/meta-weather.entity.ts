import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Weather } from '../models/weather.model';
import { MetaWeatherCreation } from './models/meta-weather-creation.model';

@Entity({ name: 'weather' })
export class MetaWeather implements Weather {
  @ApiProperty()
  @PrimaryColumn('text')
  city!: string;

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

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  @UpdateDateColumn()
  updatedAt!: string;

  constructor(creationModel: MetaWeatherCreation) {
    Object.assign(this, creationModel);
  }
}
