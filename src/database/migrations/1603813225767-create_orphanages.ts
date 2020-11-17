import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603813225767 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Realiza alterações em nosso banco de dados
    /**
     * Criar tabela
     * deletar campo
     * criar novo campo
     * etc
    **/
    await queryRunner.createTable(new Table({
      name: "orphanages",
      columns: [
        {
          name: 'id',
          type: 'integer',

          // Esta coluna sempre será um número positivo
          unsigned: true,
          // indica que esta é a primaryKey (chave única de cada objeto)
          isPrimary: true,
          // esta coluna é gerada automaticamente
          isGenerated: true,
          // utiliza o incremento como forma de gerar automaticamente
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',

          // números antes da vírgula
          scale: 10,
          // números depois da vírgula
          precision: 2
        },
        {
          name: 'longitude',
          type: 'decimal', 
          scale: 10,
          precision: 2
        },
        {
          name: 'about',
          type: 'text'
        },
        {
          name: 'instructions',
          type: 'text'
        },
        {
          name: 'opening_hours',
          type: 'varchar'
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Desfaz o que foi feito no método UP
    await queryRunner.dropTable('orphanages');
  }
}

/**
 * Ao executar este arquivo pela primeira vez, cria-se na verdade 3 tabelas:
 *  . A tabela que nós queremos
 *  . table migrations => armazena quais migrations já foram executadas no nosso banco de dados
 *  . table sqlite_sequence => tabela que armazena campos incrementais
 */