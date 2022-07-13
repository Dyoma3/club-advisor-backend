import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignUpUserValidator from 'App/Validators/SignUpUserValidator';
import LogInUserValidator from 'App/Validators/LogInUserValidator';
import User from 'App/Models/User';

export default class UsersController {
  public async signUp({ auth, request }: HttpContextContract) {
    const { email, password, name } = await request.validate(SignUpUserValidator);
    const user = await User.findBy('email', email);
    if (!user) await User.create({ email, password, name });
    return await auth.use('api').attempt(email, password);
  }

  public async login({ auth, request}: HttpContextContract) {
    const { email, password } = await request.validate(LogInUserValidator);
    return await auth.use('api').attempt(email, password);
  }
}
