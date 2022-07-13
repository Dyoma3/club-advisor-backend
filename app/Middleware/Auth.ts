import { GuardsList } from '@ioc:Adonis/Addons/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { AuthenticationException } from '@adonisjs/auth/build/standalone';

/**
 * Auth middleware is meant to restrict un-authenticated access to a given route
 * or a group of routes.
 *
 * You must register this middleware inside `start/kernel.ts` file under the list
 * of named middleware.
 */
export default class AuthMiddleware {
  private validateUserPath({ auth, request, params }: HttpContextContract) {
    const requestArray = request.url().split('/');
    const isUserRequest = requestArray[1] === 'users' && requestArray.length === 3;
    if (isUserRequest && ['DELETE', 'PATCH', 'PUT'].includes(request.method()))
      return auth.user!.id === parseInt(params.id);
    return true;
  }

  private validateUserNestedPath({ auth, params }: HttpContextContract) {
    const { user_id: userId } = params;
    if (!userId) return true;
    return auth.user!.id === parseInt(userId);
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { auth, response } = ctx;
    await auth.use('api').authenticate();
    if (!this.validateUserPath(ctx))
      return response.unauthorized({ error: "API token doesn't match to email" });
    if (!this.validateUserNestedPath(ctx))
      return response.unauthorized({ error: "API token doesn't match to id" });
    await next();
  }
}
