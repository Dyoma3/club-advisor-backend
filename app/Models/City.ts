import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Country from './Country';
import Club from './Club';

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public countryId: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Country)
  public country: BelongsTo<typeof Country>;

  @hasMany(() => Club)
  public clubs: HasMany<typeof Club>;
}
