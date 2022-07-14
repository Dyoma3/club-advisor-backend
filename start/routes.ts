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

Route.resource('countries.cities', 'CitiesController').apiOnly().middleware(authMiddleware);

Route.resource('cities', 'CitiesController')
  .only(['index', 'show', 'destroy'])
  .middleware(authMiddleware);

Route.resource('music-types', 'MusicTypesController').apiOnly().middleware(authMiddleware);
