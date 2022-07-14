import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthMiddleware {
  private validateUserPath({ auth, params, request }: HttpContextContract) {
    const requestArray = request.url().split('/');
    if (requestArray[1] === 'users') return auth.user!.id === parseInt(params.id);
    return true;
  }

  private validateUserNestedPath({ auth, params }: HttpContextContract) {
    const { user_id: userId } = params;
    if (!userId) return true;
    return auth.user!.id === parseInt(userId);
  }

  private validatePrivilegedPath({ auth, request }: HttpContextContract) {
    if (
      request.matchesRoute([
        '/countries',
        '/countries/:id',
        '/cities/:id',
        '/countries/:country_id/cities',
        '/countries/:country_id/cities/:id',
        '/music-types',
        '/music-types/:id',
      ]) &&
      auth.user!.role === 'NORMAL'
    )
      return false;
    return true;
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { auth, response } = ctx;
    await auth.use('api').authenticate();
    if (!this.validateUserPath(ctx))
      return response.unauthorized({ error: "API token doesn't match to id" });
    if (!this.validateUserNestedPath(ctx))
      return response.unauthorized({ error: "API token doesn't match to id" });
    if (!this.validatePrivilegedPath(ctx))
      return response.unauthorized({ error: "User doesn't have required privileges" });
    await next();
  }
}
