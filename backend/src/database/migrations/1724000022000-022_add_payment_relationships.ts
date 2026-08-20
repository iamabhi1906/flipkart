import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddPaymentRelationships1724000022000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'payments',
      new TableForeignKey({
        name: 'FK_PAYMENTS_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('payments', 'FK_PAYMENTS_ORDER');
  }
}
