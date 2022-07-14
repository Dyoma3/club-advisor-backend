import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import City from './City';
import User from './User';

export default class Club extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cityId: number;

  @column()
  public adminId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>;

  @belongsTo(() => User, { foreignKey: 'adminId' })
  public admin: BelongsTo<typeof User>;
}
