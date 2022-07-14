import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateMusicTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    musicTypeId: this.ctx.params.id,
  });

  public schema = schema.create({
    name: schema.string([
      rules.trim(),
      rules.alpha(),
      rules.unique({
        table: 'music_types',
        column: 'name',
        whereNot: { id: this.refs.musicTypeId },
      }),
    ]),
  });

  public messages: CustomMessages = {};
}
