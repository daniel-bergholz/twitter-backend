import { MigrationInterface, QueryRunner } from 'typeorm';

export class onDeleteCascade1631318072137 implements MigrationInterface {
  name = 'onDeleteCascade1631318072137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."tweets" DROP CONSTRAINT "FK_8039099215c037f10c11b0cf228"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users_followers_users" DROP CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tweets" ADD CONSTRAINT "FK_8039099215c037f10c11b0cf228" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users_followers_users" ADD CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users_followers_users" DROP CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tweets" DROP CONSTRAINT "FK_8039099215c037f10c11b0cf228"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."users_followers_users" ADD CONSTRAINT "FK_1433e3275a501bc09f5c33c7ca2" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tweets" ADD CONSTRAINT "FK_8039099215c037f10c11b0cf228" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
