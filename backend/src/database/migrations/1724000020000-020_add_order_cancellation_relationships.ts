import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrderCancellationRelationships1724000020000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'order_cancellations',
      new TableForeignKey({
        name: 'FK_ORDER_CANCELLATIONS_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_cancellations',
      new TableForeignKey({
        name: 'FK_ORDER_CANCELLATIONS_ORDER_ITEM',
        columnNames: ['order_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_items',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'order_cancellations',
      new TableForeignKey({
        name: 'FK_ORDER_CANCELLATIONS_CANCELLED_BY_USER',
        columnNames: ['cancelled_by_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'order_cancellations',
      'FK_ORDER_CANCELLATIONS_CANCELLED_BY_USER',
    );
    await queryRunner.dropForeignKey(
      'order_cancellations',
      'FK_ORDER_CANCELLATIONS_ORDER_ITEM',
    );
    await queryRunner.dropForeignKey(
      'order_cancellations',
      'FK_ORDER_CANCELLATIONS_ORDER',
    );
  }
}
