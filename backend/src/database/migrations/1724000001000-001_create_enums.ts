import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEnums1724000001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TYPE "user_role" AS ENUM('customer', 'vendor', 'admin');`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_status" AS ENUM('active', 'disabled', 'suspended');`,
    );
    await queryRunner.query(
      `CREATE TYPE "auth_provider" AS ENUM('email', 'google');`,
    );
    await queryRunner.query(
      `CREATE TYPE "product_status" AS ENUM('draft', 'active', 'inactive', 'out_of_stock', 'deleted');`,
    );
    await queryRunner.query(
      `CREATE TYPE "order_status" AS ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'partially_cancelled', 'completed');`,
    );
    await queryRunner.query(
      `CREATE TYPE "order_item_status" AS ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');`,
    );
    await queryRunner.query(
      `CREATE TYPE "payment_status" AS ENUM('pending', 'paid', 'failed', 'refunded', 'partially_refunded');`,
    );
    await queryRunner.query(
      `CREATE TYPE "payment_method" AS ENUM('cod', 'card', 'upi', 'net_banking', 'wallet');`,
    );
    await queryRunner.query(
      `CREATE TYPE "coupon_type" AS ENUM('percentage', 'fixed', 'free_shipping');`,
    );
    await queryRunner.query(
      `CREATE TYPE "discount_type" AS ENUM('coupon', 'promotion', 'manual');`,
    );
    await queryRunner.query(
      `CREATE TYPE "tracking_status" AS ENUM('order_placed', 'order_confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled');`,
    );
    await queryRunner.query(
      `CREATE TYPE "cancellation_reason_type" AS ENUM('customer', 'vendor', 'admin', 'system');`,
    );
    await queryRunner.query(
      `CREATE TYPE "address_type" AS ENUM('home', 'work', 'other');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS "address_type";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "cancellation_reason_type";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "tracking_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "discount_type";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "coupon_type";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "payment_method";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "payment_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "order_item_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "order_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "product_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "auth_provider";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_status";`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_role";`);
  }
}
