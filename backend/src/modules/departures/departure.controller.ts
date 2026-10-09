import type { Request, Response } from 'express';
import { sendSuccess } from '@/core/http/response';
import type { UpcomingDepartureReader } from './departure.ports';
import { upcomingDeparturesQuerySchema } from './departure.schema';

export class DepartureController {
  constructor(private readonly reader: UpcomingDepartureReader) {}

  listUpcoming = async (req: Request, res: Response): Promise<void> => {
    const query = upcomingDeparturesQuerySchema.parse(req.query);
    sendSuccess(res, await this.reader.listUpcomingDepartures(query));
  };
}
