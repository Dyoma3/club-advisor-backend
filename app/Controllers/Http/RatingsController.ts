import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RateClubValidator from 'App/Validators/Rating/RateClubValidator';
import Club from 'App/Models/Club';
import User from 'App/Models/User';

export default class RatingsController {
  public async rateClub({ auth, params, request }: HttpContextContract) {
    const { stars } = await request.validate(RateClubValidator);
    await auth.user!.related('ratedClubs').attach({ [params.id]: { stars } });
  }

  public async unrateClub({ auth, params }: HttpContextContract) {
    await auth.user!.related('ratedClubs').detach([params.id]);
  }

  public async clubRatings({ params }: HttpContextContract) {
    const club = await Club.findOrFail(params.club_id);
    const ratings = await club.related('ratings').query().pivotColumns(['stars']);
    return ratings.map((rating) => rating.toJSON());
  }

  public async userRatings({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.user_id);
    const ratedClubs = await user.related('ratedClubs').query().pivotColumns(['stars']);
    return ratedClubs.map((club) => club.toJSON());
  }
}
