import type { AppModule } from '@/core/module';
import { DepartureController } from './departure.controller';
import type { UpcomingDepartureReader } from './departure.ports';
import { createDepartureRouter } from './departure.routes';

export interface DepartureModuleDeps {
  departureReader: UpcomingDepartureReader;
}

export function createDepartureModule({ departureReader }: DepartureModuleDeps) {
  const appModule: AppModule = {
    name: 'departures',
    basePath: '/departures',
    router: createDepartureRouter(new DepartureController(departureReader)),
  };
  return { module: appModule };
}
