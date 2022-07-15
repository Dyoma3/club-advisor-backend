import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Club from 'App/Models/Club';

export default class FollowedClubsController {
  public async followedClubs({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.user_id);
    return (await user.related('followedClubs').query()).map((club) => club.toJSON());
  }

  public async clubFollowers({ params }: HttpContextContract) {
    const club = await Club.findOrFail(params.club_id);
    return (await club.related('followers').query()).map((user) => user.toJSON());
  }

  public async followClub({ params }: HttpContextContract) {
    const { user_id: userId, id } = params;
    const user = await User.findOrFail(userId);
    try {
      await user.related('followedClubs').attach([id]);
    } catch (err) {
      if (err.constraint === 'followed_clubs_user_id_club_id_unique') return;
      throw err;
    }
  }

  public async unfollowClub({ params }: HttpContextContract) {
    const { user_id: userId, id } = params;
    const user = await User.findOrFail(userId);
    await user.related('followedClubs').detach([id]);
  }
}
