import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateClubValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([rules.trim()]),
    musicTypes: schema.array
      .optional()
      .members(schema.number([rules.exists({ table: 'music_types', column: 'id' })])),
  });

  public messages: CustomMessages = {};
}
