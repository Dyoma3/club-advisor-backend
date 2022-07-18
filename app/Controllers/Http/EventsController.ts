import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Event from 'App/Models/Event';
import Club from 'App/Models/Club';

export default class EventsController {
  public async index({ params }: HttpContextContract) {
    const { club_id: clubId } = params;
    if (clubId) {
      const club = await Club.findOrFail(clubId);
      return (await club.related('events').query()).map((event) => event.toJSON());
    }
    return (await Event.all()).map((event) => event.toJSON());
  }
}
