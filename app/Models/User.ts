import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
  computed,
} from '@ioc:Adonis/Lucid/Orm';
import Club from './Club';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column()
  public role: 'ADMIN' | 'NORMAL';

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => Club, { foreignKey: 'adminId' })
  public clubs: HasMany<typeof Club>;

  @manyToMany(() => Club, { pivotTable: 'followed_clubs' })
  public followedClubs: ManyToMany<typeof Club>;

  @manyToMany(() => Club, { pivotTable: 'ratings' })
  public ratedClubs: ManyToMany<typeof Club>;

  @manyToMany(() => Club, { pivotTable: 'reviews' })
  public reviews: ManyToMany<typeof Club>;

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
