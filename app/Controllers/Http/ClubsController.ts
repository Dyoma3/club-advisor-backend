import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Club from 'App/Models/Club';
import User from 'App/Models/User';
import City from 'App/Models/City';
import Country from 'App/Models/Country';
import StoreClubValidator from 'App/Validators/Club/StoreClubValidator';
import UpdateClubValidator from 'App/Validators/Club/UpdateClubValidator';

export default class ClubsController {
  public async index({ params }: HttpContextContract) {
    const { user_id: userId, city_id: cityId, country_id: countryId } = params;
    if (userId) {
      const user = await User.findOrFail(userId);
      return (await user.related('clubs').query().preload('musicTypes')).map((club) =>
        club.toJSON()
      );
    }
    if (cityId) {
      const city = await City.findOrFail(cityId);
      return (await city.related('clubs').query().preload('musicTypes')).map((club) =>
        club.toJSON()
      );
    }
    if (countryId) {
      const country = await Country.findOrFail(countryId);
      return (await country.related('clubs').query().preload('musicTypes')).map((club) =>
        club.toJSON()
      );
    }
    return (await Club.query().preload('musicTypes')).map((club) => club.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    const club = await Club.findOrFail(params.id);
    await club.load('musicTypes');
    return club.toJSON();
  }

  public async store({ auth, request, params, response }: HttpContextContract) {
    const { name, musicTypes } = await request.validate(StoreClubValidator);
    const city = await City.findOrFail(params.city_id);
    const club = await city.related('clubs').create({ name, adminId: auth.user!.id });
    await club.related('musicTypes').attach(musicTypes);
    await club.load('musicTypes');
    response.status(201);
    return club.toJSON();
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { name, musicTypes } = await request.validate(UpdateClubValidator);
    const club = await Club.findOrFail(params.id);
    if (name) {
      club.merge({ name });
      try {
        await club.save();
      } catch (err) {
        if (err.constraint === 'clubs_city_id_name_unique')
          return response.unprocessableEntity({ error: 'City name must be unique within a city' });
        return response.internalServerError({ error: 'Unexpected server error, try again' });
      }
    }
    if (musicTypes) {
      await club.related('musicTypes').sync(musicTypes);
      await club.load('musicTypes');
    }
    return club.toJSON();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const club = await Club.findOrFail(params.id);
    await club.delete();
    return response.status(204);
  }
}
