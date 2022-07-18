import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class StoreEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    description: schema.string([rules.trim()]),
    startTime: schema.date(),
    endTime: schema.date(),
  });

  public messages: CustomMessages = {};
}
