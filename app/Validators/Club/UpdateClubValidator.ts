import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateClubValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    id: this.ctx.params.id,
    cityId: this.ctx.params.city_id,
  });

  public schema = schema.create({
    name: schema.string.optional([
      rules.trim(),
      rules.unique({
        table: 'clubs',
        column: 'name',
        where: { city_id: this.refs.cityId },
        whereNot: { id: this.refs.id },
      }),
    ]),
    musicTypes: schema.array
      .optional()
      .members(schema.number([rules.exists({ table: 'music_types', column: 'id' })])),
  });

  public messages: CustomMessages = {};
}
