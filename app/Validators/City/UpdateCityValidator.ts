import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateCityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    cityId: this.ctx.params.id,
    countryId: this.ctx.params.city_id,
  });

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.unique({
        table: 'cities',
        column: 'name',
        whereNot: { id: this.refs.cityId },
        where: { country_id: this.refs.countryId },
      }),
    ]),
  });

  public messages: CustomMessages = {};
}
