import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1535181191526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" (
				"id" SERIAL NOT NULL,
				"email" character varying NOT NULL,
				"password" character varying NOT NULL,
				"first_name" character varying NOT NULL,
				"middle_name" character varying NOT NULL,
				"last_name" character varying NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
        "media_id" integer,
        "subscription_id" integer,
        "medical_id" integer,
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "role" (
				"id" SERIAL NOT NULL,
				"name" character varying NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" (
				"id" SERIAL NOT NULL,
				"user_id" integer NOT NULL,
				"role_id" integer NOT NULL,
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "user_address" (
				"id" SERIAL NOT NULL,
				"user_id" integer NOT NULL,
				"address_id" integer NOT NULL,
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "media" (
				"id" SERIAL NOT NULL,
				"filename" character varying NOT NULL,
				"original_url" character varying NOT NULL,
				"small_url" character varying NOT NULL,
				"medium_url" character varying NOT NULL,
				"large_url" character varying NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "address" (
				"id" SERIAL NOT NULL,
				"street" character varying NOT NULL,
				"city" character varying NOT NULL,
				"country" character varying NOT NULL,
				"zipcode" character varying NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" (
				"id" SERIAL NOT NULL,
				"name" character varying NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "appointment" (
				"id" SERIAL NOT NULL,
				"status" text NOT NULL,
				"date" TIMESTAMP NOT NULL,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				"doctor_id" integer,
				"patient_id" integer,
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "medical" (
				"id" SERIAL NOT NULL,
				"conditions" text,
				"medications" text,
				"treatments" text,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
				"updated_date" TIMESTAMP NOT NULL DEFAULT now(),
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `CREATE TABLE "diagnostic" (
				"id" SERIAL NOT NULL,
				"diagnostic" text,
				"date" TIMESTAMP,
				"created_date" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_date" TIMESTAMP NOT NULL DEFAULT now(),
        "medical_id" integer,
				PRIMARY KEY ("id")
			)`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "user__media_id" FOREIGN KEY ("media_id") REFERENCES "media"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "user__subscription_id" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "user__medical_id" FOREIGN KEY ("medical_id") REFERENCES "medical"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "appointment__doctor_id" FOREIGN KEY ("doctor_id") REFERENCES "user"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "appointment__patient_id" FOREIGN KEY ("patient_id") REFERENCES "user"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "diagnostic" ADD CONSTRAINT "diagnostic__medical_id" FOREIGN KEY ("medical_id") REFERENCES "medical"("id")`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "user_role__user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "user_role__role_id" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "user_address__user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_address" ADD CONSTRAINT "user_address__address_id" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE`
    );

    await queryRunner.query(
      `INSERT INTO "role" (name) VALUES ('Admin'), ('Doctor'), ('Patient');`
    );
    await queryRunner.query(
      `INSERT INTO "subscription" (name) VALUES ('Basic'), ('Premium')`
    );
    // $2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a Password123
    await queryRunner.query(
      `INSERT INTO "user" (email, password, first_name, middle_name, last_name, subscription_id)
				VALUES
			('admin@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'admin', 'admin', 'docnest', NULL),
			('doctorbasic@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'doctorbasic', 'doctor', 'docnest', 1),
			('doctorpremium@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'doctorpremium', 'doctor', 'docnest', 2),
			('patient@docnest.com', '$2b$10$HT8J8TymDMawKXDuKvC75.mCHD0E.nljIq4V5Fa7aAUgtk9sAjc/a', 'patient', 'patient', 'docnest', NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "user_role" (user_id, role_id)
				VALUES
			(1, 1), (2, 2), (3, 2), (4, 3)`
    );
    await queryRunner.query(
      `INSERT INTO "appointment" (status, "date", created_date, updated_date, doctor_id, patient_id)
        VALUES
      ('', now(), now(), now(), 2, 4), ('', now(), now(), now(), 3, 4);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `DROP TABLE "user", "role", "user_role", "user_address", "media", "address", "subscription", "appointment", "medical", "diagnostic" CASCADE`
    );
  }
}
