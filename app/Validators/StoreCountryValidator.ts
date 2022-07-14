import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreCountryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.unique({ table: 'countries', column: 'name' }),
      rules.alpha(),
    ]),
  });

  public messages: CustomMessages = {};
}
