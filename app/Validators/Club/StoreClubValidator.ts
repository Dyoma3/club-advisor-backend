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
      rules.unique({ table: 'club', column: 'name', where: { city_id: this.refs.cityId } }),
    ]),
  });

  public messages: CustomMessages = {};
}
