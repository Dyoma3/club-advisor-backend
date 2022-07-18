import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Club from 'App/Models/Club';
import StoreReviewValidator from 'App/Validators/Review/StoreReviewValidator';
import UpdateReviewValidator from 'App/Validators/Review/UpdateReviewValidator';

export default class ReviewsController {
  public async index({ params }: HttpContextContract) {
    const { user_id: userId, club_id: clubId } = params;
    if (userId) {
      const user = await User.findOrFail(userId);
      return (await user.related('reviews').query().pivotColumns(['title', 'description'])).map(
        (review) => review.toJSON()
      );
    }
    const club = await Club.findOrFail(clubId);
    return (await club.related('reviews').query().pivotColumns(['title', 'description'])).map(
      (review) => review.toJSON()
    );
  }

  public async store({ auth, params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreReviewValidator);
    await auth.user!.related('reviews').attach({ [params.club_id]: payload });
    response.status(201);
    const review = await auth
      .user!.related('reviews')
      .query()
      .where({ club_id: params.club_id })
      .pivotColumns(['title', 'description'])
      .firstOrFail();
    return review.toJSON();
  }

  public async update({ auth, params, request }: HttpContextContract) {
    const payload = await request.validate(UpdateReviewValidator);
    await auth.user!.related('reviews').sync({ [params.club_id]: payload }, false);
    const review = await auth
      .user!.related('reviews')
      .query()
      .where({ club_id: params.club_id })
      .pivotColumns(['title', 'description'])
      .firstOrFail();
    return review.toJSON();
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.user!.related('reviews').detach([params.club_id]);
    return response.status(204);
  }
}
