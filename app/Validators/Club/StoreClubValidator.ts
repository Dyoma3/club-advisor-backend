import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreClubValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    cityId: this.ctx.params.city_id,
  });

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.unique({ table: 'clubs', column: 'name', where: { city_id: this.refs.cityId } }),
    ]),
    musicTypes: schema
      .array()
      .members(schema.number([rules.exists({ table: 'music_types', column: 'id' })])),
  });

  public messages: CustomMessages = {};
}
