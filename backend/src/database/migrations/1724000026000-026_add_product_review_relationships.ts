import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddProductReviewRelationships1724000026000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'product_reviews',
      new TableForeignKey({
        name: 'FK_PRODUCT_REVIEWS_PRODUCT',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_reviews',
      new TableForeignKey({
        name: 'FK_PRODUCT_REVIEWS_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_reviews',
      new TableForeignKey({
        name: 'FK_PRODUCT_REVIEWS_ORDER_ITEM',
        columnNames: ['order_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_items',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_reviews', 'FK_PRODUCT_REVIEWS_ORDER_ITEM');
    await queryRunner.dropForeignKey('product_reviews', 'FK_PRODUCT_REVIEWS_USER');
    await queryRunner.dropForeignKey('product_reviews', 'FK_PRODUCT_REVIEWS_PRODUCT');
  }
}
