import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.post('sign-up', 'UsersController.signUp');

Route.post('log-in', 'UsersController.logIn');

Route.resource('users', 'UsersController').apiOnly().middleware({
  update: 'auth',
  destroy: 'auth',
});

Route.resource('countries', 'CountriesController').apiOnly().middleware({
  store: 'auth',
  update: 'auth',
  destroy: 'auth',
});

Route.resource('countries.cities', 'CitiesController').apiOnly().middleware({
  store: 'auth',
  update: 'auth',
  destroy: 'auth',
});
