import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Country from './Country';

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
}
