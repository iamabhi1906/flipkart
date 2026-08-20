import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderTracking1724000017000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_tracking',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'order_item_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'tracking_status',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'tracking_number',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'courier_name',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_tracking');
  }
}
