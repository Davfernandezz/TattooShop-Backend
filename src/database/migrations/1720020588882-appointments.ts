import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class Appointments1720020588882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "date",
                        type: "datetime",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "service_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["service_id"],
                        referencedTableName: "services",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                ],
                uniques: [
                    new TableUnique({
                        name: "user_service_unique",
                        columnNames: ["date", "user_id", "service_id"]
                    }),
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments")
    }
}
