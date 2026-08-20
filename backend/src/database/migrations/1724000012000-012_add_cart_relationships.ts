import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddCartRelationships1724000012000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'carts',
      new TableForeignKey({
        name: 'FK_CARTS_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        name: 'FK_CART_ITEMS_CART',
        columnNames: ['cart_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        name: 'FK_CART_ITEMS_PRODUCT',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        name: 'FK_CART_ITEMS_VARIANT',
        columnNames: ['variant_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_variants',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cart_items', 'FK_CART_ITEMS_VARIANT');
    await queryRunner.dropForeignKey('cart_items', 'FK_CART_ITEMS_PRODUCT');
    await queryRunner.dropForeignKey('cart_items', 'FK_CART_ITEMS_CART');
    await queryRunner.dropForeignKey('carts', 'FK_CARTS_USER');
  }
}
