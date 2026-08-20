import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddCouponOrderRelationship1724000016000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'coupon_user_usage',
      new TableForeignKey({
        name: 'FK_COUPON_USAGE_COUPON',
        columnNames: ['coupon_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coupons',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'coupon_user_usage',
      new TableForeignKey({
        name: 'FK_COUPON_USAGE_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'coupon_user_usage',
      new TableForeignKey({
        name: 'FK_COUPON_USAGE_ORDER',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('coupon_user_usage', 'FK_COUPON_USAGE_ORDER');
    await queryRunner.dropForeignKey('coupon_user_usage', 'FK_COUPON_USAGE_USER');
    await queryRunner.dropForeignKey('coupon_user_usage', 'FK_COUPON_USAGE_COUPON');
  }
}
