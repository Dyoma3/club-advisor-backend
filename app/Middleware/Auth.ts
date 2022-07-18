import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Club from 'App/Models/Club';

export default class AuthMiddleware {
  private validateUserPath({ auth, params, request }: HttpContextContract) {
    if (request.matchesRoute('/users/:id')) return auth.user!.id === parseInt(params.id);
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

  private async validateClubPath({ auth, request, params }: HttpContextContract) {
    if (request.matchesRoute(['/clubs/:id', '/cities/:city_id/clubs/:id'])) {
      const club = await Club.findOrFail(params.id);
      return auth.user!.id === club.adminId;
    }
    return true;
  }

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { auth, response } = ctx;
    await auth.use('api').authenticate();
    if (!this.validateUserPath(ctx) || !this.validateUserNestedPath(ctx))
      return response.unauthorized({ error: "Token doesn't match to id" });
    if (!this.validatePrivilegedPath(ctx))
      return response.unauthorized({ error: "User doesn't have required privileges" });
    if (!(await this.validateClubPath(ctx)))
      return response.unauthorized({ error: 'Only the club admin can perform this operation' });
    await next();
  }
}
