import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class SignUpUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim(), rules.alpha()]),
    email: schema.string([rules.email(), rules.trim()]),
    password: schema.string(),
  });

  public messages: CustomMessages = {};
}
