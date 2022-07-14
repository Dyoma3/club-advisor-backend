import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreMusicTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim(), rules.unique({ table: 'music_types', column: 'name' })]),
  });

  public messages: CustomMessages = {};
}
