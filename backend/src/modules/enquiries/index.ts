import type { AppLogger } from '@/core/logger/logger';
import type { AppModule } from '@/core/module';
import type { Clock } from '@/core/time/clock';
import { EnquiryController } from './enquiry.controller';
import type { EnquiryNotifier } from './enquiry.notifier';
import type { PackageLookup } from './enquiry.ports';
import type { EnquiryRepository } from './enquiry.repository';
import { createEnquiryRouter, type EnquiryRouteGuards } from './enquiry.routes';
import { EnquiryService } from './enquiry.service';

export interface EnquiryModuleDeps extends EnquiryRouteGuards {
  enquiryRepository: EnquiryRepository;
  packageLookup: PackageLookup;
  notifier: EnquiryNotifier;
  logger: AppLogger;
  clock?: Clock;
}

export function createEnquiryModule({
  enquiryRepository,
  packageLookup,
  notifier,
  logger,
  clock,
  submitLimiter,
  adminGuard,
}: EnquiryModuleDeps) {
  const service = new EnquiryService(enquiryRepository, packageLookup, notifier, logger, clock);
  const appModule: AppModule = {
    name: 'enquiries',
    basePath: '/enquiries',
    router: createEnquiryRouter(new EnquiryController(service), { submitLimiter, adminGuard }),
  };
  return { module: appModule, service };
}

export { CompositeEnquiryNotifier, LogEnquiryNotifier } from './enquiry.notifier';
export { JsonFileEnquiryRepository } from './enquiry.repository';
export type { Enquiry } from './enquiry.types';
