import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeliveryOtp1724000028000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "order_item_status" ADD VALUE IF NOT EXISTS 'out_for_delivery';`,
    );
    await queryRunner.query(
      `ALTER TYPE "order_status" ADD VALUE IF NOT EXISTS 'out_for_delivery';`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD COLUMN IF NOT EXISTS "delivery_otp" varchar(10);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP COLUMN IF EXISTS "delivery_otp";`,
    );
  }
}
