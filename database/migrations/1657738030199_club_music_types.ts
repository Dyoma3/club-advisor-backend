import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'club_music_type';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('club_id').references('clubs.id').onDelete('CASCADE').notNullable();
      table.integer('music_type_id').references('music_types.id').onDelete('CASCADE').notNullable();
      table.unique(['club_id', 'music_type_id']);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
