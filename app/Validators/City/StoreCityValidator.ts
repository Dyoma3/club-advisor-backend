import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreCityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    countryId: this.ctx.params.country_id,
  });

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.unique({ table: 'cities', column: 'name', where: { country_id: this.refs.countryId } }),
    ]),
  });

  public messages: CustomMessages = {};
}
