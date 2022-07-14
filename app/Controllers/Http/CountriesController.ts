import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Country from 'App/Models/Country';
import StoreCountryValidator from 'App/Validators/Country/StoreCountryValidator';
import UpdateCountryValidator from 'App/Validators/Country/UpdateCountryValidator';

export default class CountriesController {
  public async index() {
    return (await Country.all()).map((country) => country.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await Country.findOrFail(params.id)).toJSON();
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = await request.validate(StoreCountryValidator);
    const country = await Country.create({ name });
    response.status(201);
    return country.toJSON();
  }

  public async update({ request, params }: HttpContextContract) {
    const { name } = await request.validate(UpdateCountryValidator);
    const country = await Country.findOrFail(params.id);
    country.merge({ name });
    await country.save();
    return country.toJSON();
  }

  public async destroy({ params, response }: HttpContextContract) {
    const country = await Country.findOrFail(params.id);
    await country.delete();
    return response.status(204);
  }
}
