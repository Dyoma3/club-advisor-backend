import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([rules.trim()]),
    description: schema.string.optional([rules.trim()]),
    startTime: schema.date.optional(),
    endTime: schema.date.optional(),
  });

  public messages: CustomMessages = {};
}
