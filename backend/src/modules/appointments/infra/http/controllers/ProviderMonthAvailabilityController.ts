import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailablityService from '@modules/appointments/services/ListProviderMonthAvailablityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listProviderMonthAvailablity = container.resolve(
      ListProviderMonthAvailablityService,
    );

    const providers = await listProviderMonthAvailablity.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    // Regra de negócio -> Em services
    return response.json(providers);
  }
}
