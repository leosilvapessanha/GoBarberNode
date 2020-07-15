import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterProviderFieldToProviderId1593193820231 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentsProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',  // RESTRICT, SET NULL, CASCADE
      onUpdate: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //DESFAZER ITEM POR ITEM AO CONTRARIO
    await queryRunner.dropForeignKey('appointments', 'AppointmentsProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }));

  }

}
