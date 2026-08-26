import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrderTrackingRelationships1724000018000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'order_tracking',
      new TableForeignKey({
        name: 'FK_ORDER_TRACKING_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_tracking',
      new TableForeignKey({
        name: 'FK_ORDER_TRACKING_ORDER_ITEM',
        columnNames: ['order_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_items',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'order_tracking',
      'FK_ORDER_TRACKING_ORDER_ITEM',
    );
    await queryRunner.dropForeignKey(
      'order_tracking',
      'FK_ORDER_TRACKING_ORDER',
    );
  }
}
