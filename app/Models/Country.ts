import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import City from './City';

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => City)
  public cities: HasMany<typeof City>;
}
