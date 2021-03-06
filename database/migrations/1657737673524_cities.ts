import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'cities';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('country_id').references('countries.id').onDelete('CASCADE').notNullable();
      table.string('name', 100).notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
      table.unique(['country_id', 'name']);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
