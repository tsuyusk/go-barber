import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailablityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.query;
    const { provider_id } = request.params;

    const listProviderDayAvailablity = container.resolve(
      ListProviderDayAvailablityService,
    );

    const providers = await listProviderDayAvailablity.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    // Regra de negócio -> Em services
    return response.json(providers);
  }
}
