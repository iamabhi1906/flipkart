import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrders1724000014000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. orders
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_number',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'order_status',
            default: "'pending'",
          },
          {
            name: 'payment_status',
            type: 'payment_status',
            default: "'pending'",
          },
          {
            name: 'payment_method',
            type: 'payment_method',
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'tax_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'shipping_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'discount_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'total_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'coupon_code',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'shipping_full_name',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'shipping_mobile_number',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'shipping_address_line_1',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'shipping_address_line_2',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'shipping_landmark',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'shipping_city',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'shipping_state',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'shipping_country',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'shipping_postal_code',
            type: 'varchar',
            length: '20',
          },
          {
            name: 'placed_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'confirmed_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'shipped_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'delivered_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'cancelled_at',
            type: 'timestamp',
            isNullable: true,
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

    // 2. order_items
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'vendor_id',
            type: 'uuid',
          },
          {
            name: 'variant_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'product_name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'sku',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'unit_price',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'tax_rate',
            type: 'decimal',
            precision: 5,
            scale: 2,
            default: 0,
          },
          {
            name: 'tax_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'discount_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'total_amount',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'status',
            type: 'order_item_status',
            default: "'pending'",
          },
          {
            name: 'cancelled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'delivered_at',
            type: 'timestamp',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_items');
    await queryRunner.dropTable('orders');
  }
}
