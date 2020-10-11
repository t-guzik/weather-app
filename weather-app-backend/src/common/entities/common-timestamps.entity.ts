import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonTimestampsEntity {
  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  createdAt!: string;

  @ApiProperty({ format: 'date-time' })
  @UpdateDateColumn()
  updatedAt!: string;
}
