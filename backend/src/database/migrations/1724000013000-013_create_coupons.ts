import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCoupons1724000013000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. coupons
    await queryRunner.createTable(
      new Table({
        name: 'coupons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'coupon_type',
            type: 'coupon_type',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'minimum_order_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'maximum_discount_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'usage_limit',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'usage_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'starts_at',
            type: 'timestamp',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // 2. coupon_user_usage
    await queryRunner.createTable(
      new Table({
        name: 'coupon_user_usage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'coupon_id',
            type: 'uuid',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'discount_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'used_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coupon_user_usage');
    await queryRunner.dropTable('coupons');
  }
}
