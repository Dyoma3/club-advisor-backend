import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignUpUserValidator from 'App/Validators/User/SignUpUserValidator';
import LogInUserValidator from 'App/Validators/User/LogInUserValidator';
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator';
import User from 'App/Models/User';
import { Response } from '@adonisjs/core/build/standalone';

export default class UsersController {
  public async index() {
    return (await User.all()).map((user) => user.toJSON());
  }

  public async show({ params }: HttpContextContract) {
    return (await User.findOrFail(params.id)).toJSON();
  }

  public async signUp({ auth, request, response }: HttpContextContract) {
    const { email, password, name } = await request.validate(SignUpUserValidator);
    const role = email === 'dinko.f.yoma@gmail.com' ? 'ADMIN' : 'NORMAL';
    const user = await User.findBy('email', email);
    if (!user) await User.create({ email, password, name, role });
    await auth.use('api').attempt(email, password);
    return response.status(201);
  }

  public async logIn({ auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LogInUserValidator);
    return await auth.use('api').attempt(email, password);
  }

  public async update({ auth, request }: HttpContextContract) {
    const { name } = await request.validate(UpdateUserValidator);
    auth.user!.merge({ name });
    await auth.user!.save();
    return auth.user!.toJSON();
  }
}
