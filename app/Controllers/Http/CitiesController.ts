import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import City from 'App/Models/City';
import Country from 'App/Models/Country';
import StoreCityValidator from 'App/Validators/City/StoreCityValidator';
import UpdateCityValidator from 'App/Validators/City/UpdateCityValidator';

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

  public async store({ request, params, response }: HttpContextContract) {
    const { name } = await request.validate(StoreCityValidator);
    const { country_id: countryId } = params;
    const city = await (await Country.findOrFail(countryId)).related('cities').create({ name });
    response.status(201);
    return city.toJSON();
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateCityValidator);
    const city = await City.findOrFail(params.id);
    city.merge(payload);
    try {
      await city.save();
    } catch (err) {
      if (err.constraint === 'cities_country_id_name_unique')
        return response.unprocessableEntity({ error: 'City name must be unique within a country' });
      return response.internalServerError({ error: 'Unexpected server error, try again' });
    }
    return city.toJSON();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const city = await City.findOrFail(params.id);
    await city.delete();
    return response.status(204);
  }
}
