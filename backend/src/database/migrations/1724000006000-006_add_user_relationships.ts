import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserRelationships1724000006000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'password_resets',
      new TableForeignKey({
        name: 'FK_PASSWORD_RESETS_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_profiles',
      new TableForeignKey({
        name: 'FK_USER_PROFILES_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vendor_profiles',
      new TableForeignKey({
        name: 'FK_VENDOR_PROFILES_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'admin_profiles',
      new TableForeignKey({
        name: 'FK_ADMIN_PROFILES_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'addresses',
      new TableForeignKey({
        name: 'FK_ADDRESSES_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        name: 'FK_NOTIFICATIONS_USER',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notifications', 'FK_NOTIFICATIONS_USER');
    await queryRunner.dropForeignKey('addresses', 'FK_ADDRESSES_USER');
    await queryRunner.dropForeignKey('admin_profiles', 'FK_ADMIN_PROFILES_USER');
    await queryRunner.dropForeignKey('vendor_profiles', 'FK_VENDOR_PROFILES_USER');
    await queryRunner.dropForeignKey('user_profiles', 'FK_USER_PROFILES_USER');
    await queryRunner.dropForeignKey('password_resets', 'FK_PASSWORD_RESETS_USER');
  }
}
