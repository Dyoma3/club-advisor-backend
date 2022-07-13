import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCountryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    countryId: this.ctx.params.id,
  });

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.unique({ table: 'countries', column: 'name', whereNot: { id: this.refs.countryId } }),
    ]),
  });

  public messages: CustomMessages = {};
}
