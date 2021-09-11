import {MigrationInterface, QueryRunner} from "typeorm";

export class tweets1631309028418 implements MigrationInterface {
    name = 'tweets1631309028418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_19d841599ad812c558807aec76c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_8039099215c037f10c11b0cf228" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_8039099215c037f10c11b0cf228"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
    }

}
