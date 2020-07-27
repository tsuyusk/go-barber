import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailablityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.body;
    const { provider_id } = request.params;

    const listProviderDayAvailablity = container.resolve(
      ListProviderDayAvailablityService,
    );

    const providers = await listProviderDayAvailablity.execute({
      provider_id,
      month,
      year,
      day,
    });

    // Regra de negócio -> Em services
    return response.json(providers);
  }
}
