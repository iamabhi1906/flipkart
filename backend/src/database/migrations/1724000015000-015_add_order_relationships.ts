import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrderRelationships1724000015000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'FK_ORDERS_CUSTOMER',
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_ORDER_ITEMS_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_ORDER_ITEMS_PRODUCT',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_ORDER_ITEMS_VENDOR',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'order_items',
      new TableForeignKey({
        name: 'FK_ORDER_ITEMS_VARIANT',
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_variants',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order_items', 'FK_ORDER_ITEMS_VARIANT');
    await queryRunner.dropForeignKey('order_items', 'FK_ORDER_ITEMS_VENDOR');
    await queryRunner.dropForeignKey('order_items', 'FK_ORDER_ITEMS_PRODUCT');
    await queryRunner.dropForeignKey('order_items', 'FK_ORDER_ITEMS_ORDER');
    await queryRunner.dropForeignKey('orders', 'FK_ORDERS_CUSTOMER');
  }
}
