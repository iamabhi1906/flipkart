import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddProductRelationships1724000010000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'FK_PRODUCTS_VENDOR',
        columnNames: ['vendor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'FK_PRODUCTS_CATEGORY',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'product_images',
      new TableForeignKey({
        name: 'FK_PRODUCT_IMAGES_PRODUCT',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_variants',
      new TableForeignKey({
        name: 'FK_PRODUCT_VARIANTS_PRODUCT',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_variants', 'FK_PRODUCT_VARIANTS_PRODUCT');
    await queryRunner.dropForeignKey('product_images', 'FK_PRODUCT_IMAGES_PRODUCT');
    await queryRunner.dropForeignKey('products', 'FK_PRODUCTS_CATEGORY');
    await queryRunner.dropForeignKey('products', 'FK_PRODUCTS_VENDOR');
  }
}
