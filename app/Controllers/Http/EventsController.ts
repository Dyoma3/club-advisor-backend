import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Event from 'App/Models/Event';
import Club from 'App/Models/Club';
import StoreEventValidator from 'App/Validators/Event/StoreEventValidator';
import UpdateEventValidator from 'App/Validators/Event/UpdateEventValidator';

export default class EventsController {
  public async index({ params }: HttpContextContract) {
    const { club_id: clubId } = params;
    if (clubId) {
      const club = await Club.findOrFail(clubId);
      return (await club.related('events').query()).map((event) => event.toJSON());
    }
    return (await Event.all()).map((event) => event.toJSON());
  }

  public async store({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreEventValidator);
    const { club_id: clubId } = params;
    const club = await Club.findOrFail(clubId);
    const event = await club.related('events').create(payload);
    response.status(201);
    return event.toJSON();
  }

  public async update({ params, request }) {
    const payload = await request.validate(UpdateEventValidator);
    const event = await Event.findOrFail(params.id);
    event.merge(payload);
    await event.save();
    return event.toJSON();
  }
}
