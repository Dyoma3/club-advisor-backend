import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MusicType from 'App/Models/MusicType';
import StoreMusicTypeValidator from 'App/Validators/MusicType/StoreMusicTypeValidator';
import UpdateMusicTypeValidator from 'App/Validators/MusicType/UpdateMusicTypeValidator';

export default class MusicTypesController {
  public async index() {
    return (await MusicType.all()).map((musicType) => musicType.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await MusicType.findOrFail(params.id)).toJSON();
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(StoreMusicTypeValidator);
    const musicType = await MusicType.create(payload);
    response.status(201);
    return musicType.toJSON();
  }

  public async update({ request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateMusicTypeValidator);
    const musicType = await MusicType.findOrFail(params.id);
    musicType.merge(payload);
    await musicType.save();
    return musicType.toJSON();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const musicType = await MusicType.findOrFail(params.id);
    await musicType.delete();
    return response.status(204);
  }
}
