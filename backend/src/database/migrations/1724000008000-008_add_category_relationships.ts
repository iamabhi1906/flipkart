import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddCategoryRelationships1724000008000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'categories',
      new TableForeignKey({
        name: 'FK_CATEGORIES_PARENT',
        columnNames: ['parent_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('categories', 'FK_CATEGORIES_PARENT');
  }
}
