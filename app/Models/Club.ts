import { DateTime } from 'luxon';
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm';
import City from './City';
import User from './User';
import MusicType from './MusicType';
import Event from './Event';

export default class Club extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cityId: number;

  @column()
  public adminId: number;

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>;

  @belongsTo(() => User, { foreignKey: 'adminId' })
  public admin: BelongsTo<typeof User>;

  @manyToMany(() => MusicType, { pivotTable: 'club_music_type' })
  public musicTypes: ManyToMany<typeof MusicType>;

  @manyToMany(() => User, { pivotTable: 'followed_clubs' })
  public followers: ManyToMany<typeof User>;

  @manyToMany(() => User, { pivotTable: 'ratings' })
  public ratings: ManyToMany<typeof User>;

  @manyToMany(() => User, { pivotTable: 'reviews' })
  public reviews: ManyToMany<typeof User>;

  @hasMany(() => Event)
  public events: HasMany<typeof Event>;

  @computed()
  public get stars() {
    return this.$extras.pivot_stars;
  }

  @computed()
  public get review_title() {
    return this.$extras.pivot_title;
  }

  @computed()
  public get review_description() {
    return this.$extras.pivot_description;
  }
}
