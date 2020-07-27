import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailablityService from '@modules/appointments/services/ListProviderMonthAvailablityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderMonthAvailablity = container.resolve(
      ListProviderMonthAvailablityService,
    );

    const providers = await listProviderMonthAvailablity.execute({
      provider_id,
      month,
      year,
    });

    // Regra de negócio -> Em services
    return response.json(providers);
  }
}
