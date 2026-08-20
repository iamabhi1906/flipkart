import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateOtpChallenges1724000003000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'otp_challenges',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'otp_hash',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'expires_at',
            type: 'timestamp',
          },
          {
            name: 'attempts',
            type: 'int',
            default: 0,
          },
          {
            name: 'used',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'otp_challenges',
      new TableIndex({
        name: 'IDX_OTP_CHALLENGES_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'otp_challenges',
      new TableIndex({
        name: 'IDX_OTP_CHALLENGES_EXPIRES_AT',
        columnNames: ['expires_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('otp_challenges');
  }
}
