import Route from '@ioc:Adonis/Core/Route';

const authMiddleware = { store: 'auth', update: 'auth', destroy: 'auth' };

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.post('sign-up', 'UsersController.signUp');

Route.post('log-in', 'UsersController.logIn');

Route.resource('users', 'UsersController').apiOnly().middleware({
  update: 'auth',
  destroy: 'auth',
});

Route.resource('countries', 'CountriesController').apiOnly().middleware(authMiddleware);

Route.resource('countries.cities', 'CitiesController')
  .only(['index', 'store'])
  .middleware(authMiddleware);

Route.resource('cities', 'CitiesController')
  .only(['index', 'show', 'update', 'destroy'])
  .middleware(authMiddleware);

Route.resource('music-types', 'MusicTypesController').apiOnly().middleware(authMiddleware);

Route.resource('cities.clubs', 'ClubsController')
  .only(['index', 'store'])
  .middleware(authMiddleware);

Route.get('countries/:country_id/clubs', 'ClubsController.index');

Route.get('users/:user_id/clubs', 'ClubsController.index');

Route.resource('clubs', 'ClubsController')
  .only(['index', 'show', 'update', 'destroy'])
  .middleware(authMiddleware);

Route.get('users/:user_id/followed-clubs', 'FollowedClubsController.followedClubs');

Route.get('clubs/:club_id/followers', 'FollowedClubsController.clubFollowers');

Route.post('follow-club/:id', 'FollowedClubsController.followClub').middleware('auth');

Route.post('unfollow-club/:id', 'FollowedClubsController.unfollowClub').middleware('auth');

Route.post('rate-club/:id', 'RatingsController.rateClub').middleware('auth');

Route.post('unrate-club/:id', 'RatingsController.unrateClub').middleware('auth');

Route.get('clubs/:club_id/ratings', 'RatingsController.clubRatings');

Route.get('users/:user_id/ratings', 'RatingsController.userRatings');

Route.resource('clubs.reviews', 'ReviewsController')
  .only(['index', 'store'])
  .middleware(authMiddleware);

Route.delete('clubs/:club_id/reviews', 'ReviewsController.destroy').middleware('auth');

Route.patch('clubs/:club_id/reviews', 'ReviewsController.update').middleware('auth');

Route.get('users/:user_id/reviews', 'ReviewsController.index');
