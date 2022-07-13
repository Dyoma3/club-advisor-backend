import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'reviews';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable();
      table.integer('club_id').references('clubs.id').onDelete('CASCADE').notNullable();
      table.string('title', 100).notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
