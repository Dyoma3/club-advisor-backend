import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Country from 'App/Models/Country';
import StoreCountryValidator from 'App/Validators/StoreCountryValidator';
import UpdateCountryValidator from 'App/Validators/UpdateCountryValidator';

export default class CountriesController {
  public async index() {
    return (await Country.all()).map((country) => country.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await Country.findOrFail(params.id)).toJSON();
  }

  public async store({ request }: HttpContextContract) {
    const { name } = await request.validate(StoreCountryValidator);
    return await Country.create({ name });
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
    response.status(204);
    return;
  }
}
