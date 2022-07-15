import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RateClubValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    stars: schema.number([rules.range(1, 5)]),
  });

  public messages: CustomMessages = {};
}
