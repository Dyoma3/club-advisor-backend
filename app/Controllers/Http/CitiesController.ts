import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import City from 'App/Models/City';
import Country from 'App/Models/Country';
import StoreCityValidator from 'App/Validators/StoreCityValidator';

export default class CitiesController {
  public async index({ params }: HttpContextContract) {
    const { country_id: countryId } = params;
    if (countryId) {
      const country = await Country.findOrFail(countryId);
      return (await country.related('cities').query()).map((city) => city.toJSON());
    }
    return (await City.all()).map((city) => city.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await City.findOrFail(params.id)).toJSON();
  }

  public async store({ request, params }: HttpContextContract) {
    const { name } = await request.validate(StoreCityValidator);
    const { country_id: countryId } = params;
    const city = await (await Country.findOrFail(countryId)).related('cities').create({ name });
    return city.toJSON();
  }
}
