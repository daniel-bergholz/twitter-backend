import { MigrationInterface, QueryRunner } from 'typeorm';

export class bio1631229799183 implements MigrationInterface {
  name = 'bio1631229799183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ADD "bio" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "bio"`);
  }
}
