import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Club from 'App/Models/Club';
import User from 'App/Models/User';
import City from 'App/Models/City';
import Country from 'App/Models/Country';

export default class ClubsController {
  public async index({ params }: HttpContextContract) {
    const { user_id: userId, city_id: cityId, country_id: countryId } = params;
    if (userId) {
      const user = await User.findOrFail(userId);
      return (await user.related('clubs').query()).map((club) => club.toJSON());
    }
    if (cityId) {
      const city = await City.findOrFail(cityId);
      return (await city.related('clubs').query()).map((club) => club.toJSON());
    }
    if (countryId) {
      const country = await Country.findOrFail(countryId);
      return (await country.related('clubs').query()).map((club) => club.toJSON());
    }
    return (await Club.all()).map((club) => club.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await Club.findOrFail(params.id)).toJSON();
  }
}
