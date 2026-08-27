import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVariantImages1724000029000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product_variants"
      ADD COLUMN IF NOT EXISTS "images" jsonb DEFAULT '[]'::jsonb,
      ADD COLUMN IF NOT EXISTS "thumbnail" character varying(500);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product_variants"
      DROP COLUMN IF EXISTS "images",
      DROP COLUMN IF EXISTS "thumbnail";
    `);
  }
}
