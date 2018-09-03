import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1535181191526 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "street" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "zipcode" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "media" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "original_url" character varying NOT NULL, "small_url" character varying NOT NULL, "medium_url" character varying NOT NULL, "large_url" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "middle_name" character varying NOT NULL, "last_name" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "profile_media_id" integer, "subscription_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "status" text NOT NULL, "date" TIMESTAMP NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "doctor_id" integer, "patient_id" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
		await queryRunner.query(`CREATE TABLE "user_role" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id"))`);
		await queryRunner.query(`CREATE TABLE "user_address" ("user_id" integer NOT NULL, "address_id" integer NOT NULL, CONSTRAINT "PK_355cdefb5d1a7e44efb77a52519" PRIMARY KEY ("user_id", "address_id"))`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d208260553448834f0dc1f40f14" FOREIGN KEY ("profile_media_id") REFERENCES "media"("id")`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ec4e57f4138e339fb111948a16f" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id")`);
		await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81" FOREIGN KEY ("doctor_id") REFERENCES "user"("id")`);
		await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_86b3e35a97e289071b4785a1402" FOREIGN KEY ("patient_id") REFERENCES "user"("id")`);
		await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE`);
		await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE`);
		await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE`);
		await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_b3bdd98c49956021c44c23a48c4" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE`);
		await queryRunner.query(`INSERT INTO "role" (name) VALUES ('Admin'), ('Doctor'), ('Patient');`);
		await queryRunner.query(`INSERT INTO "subscription" (name) VALUES ('Basic'), ('Premium')`);
		// $2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a Password123
		await queryRunner.query(`
			INSERT INTO "user" (email, password, first_name, middle_name, last_name, subscription_id)
				VALUES
			('admin@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'admin', 'admin', 'docnest', NULL),
			('doctorbasic@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'doctorbasic', 'doctor', 'docnest', 1),
			('doctorpremium@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'doctorpremium', 'doctor', 'docnest', 2),
			('patient@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'patient', 'patient', 'docnest', NULL)
		`);
		await queryRunner.query(`
			INSERT INTO "user_role" (user_id, role_id)
				VALUES
			(1, 1), (2, 2), (3, 2), (4, 3)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_b3bdd98c49956021c44c23a48c4"`);
		await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`);
		await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
		await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
		await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_86b3e35a97e289071b4785a1402"`);
		await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_9a9c484aa4a944eaec632e00a81"`);
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ec4e57f4138e339fb111948a16f"`);
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d208260553448834f0dc1f40f14"`);
		await queryRunner.query(`DROP TABLE "user_address"`);
		await queryRunner.query(`DROP TABLE "user_role"`);
		await queryRunner.query(`DROP TABLE "appointment"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "subscription"`);
		await queryRunner.query(`DROP TABLE "media"`);
		await queryRunner.query(`DROP TABLE "role"`);
		await queryRunner.query(`DROP TABLE "address"`);
	}

}
