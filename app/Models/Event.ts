import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Club from './Club';

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clubId: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public startTime: DateTime;

  @column.dateTime()
  public endTime: DateTime;

  @belongsTo(() => Club)
  public club: BelongsTo<typeof Club>;
}
