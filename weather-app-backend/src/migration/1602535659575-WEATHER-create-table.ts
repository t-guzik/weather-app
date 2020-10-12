import { MigrationInterface, QueryRunner } from 'typeorm';

export class WEATHERCreateTable1602535659575 implements MigrationInterface {
  name = 'WEATHERCreateTable1602535659575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "weather"
                             (
                                 "location"       text     NOT NULL,
                                 "date"           date     NOT NULL,
                                 "state"          text     NOT NULL,
                                 "wind_direction" float    NOT NULL,
                                 "wind_speed"     float    NOT NULL,
                                 "air_pressure"   float,
                                 "humidity"       float    NOT NULL,
                                 "predictability" integer  NOT NULL,
                                 "min_temp"       float,
                                 "max_temp"       float,
                                 "avg_temp"       float,
                                 "icon_url"       text     NOT NULL,
                                 "created_at"     datetime NOT NULL DEFAULT (datetime('now')),
                                 "updated_at"     datetime NOT NULL DEFAULT (datetime('now')),
                                 PRIMARY KEY ("location", "date")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "weather"`);
  }
}
