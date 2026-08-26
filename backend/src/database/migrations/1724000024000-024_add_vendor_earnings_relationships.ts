import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddVendorEarningsRelationships1724000024000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'vendor_earnings',
      new TableForeignKey({
        name: 'FK_VENDOR_EARNINGS_VENDOR',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vendor_earnings',
      new TableForeignKey({
        name: 'FK_VENDOR_EARNINGS_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vendor_earnings',
      new TableForeignKey({
        name: 'FK_VENDOR_EARNINGS_ORDER_ITEM',
        columnNames: ['order_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_items',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'vendor_earnings',
      'FK_VENDOR_EARNINGS_ORDER_ITEM',
    );
    await queryRunner.dropForeignKey(
      'vendor_earnings',
      'FK_VENDOR_EARNINGS_ORDER',
    );
    await queryRunner.dropForeignKey(
      'vendor_earnings',
      'FK_VENDOR_EARNINGS_VENDOR',
    );
  }
}
