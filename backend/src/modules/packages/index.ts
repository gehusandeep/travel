import type { AppModule } from '@/core/module';
import type { Clock } from '@/core/time/clock';
import { PackageController } from './package.controller';
import type { CategoryDirectory, PackageFaqReader } from './package.ports';
import type { PackageRepository } from './package.repository';
import { createPackageRouter } from './package.routes';
import { PackageService } from './package.service';

export interface PackageModuleDeps {
  packageRepository: PackageRepository;
  categoryDirectory: CategoryDirectory;
  faqReader: PackageFaqReader;
  clock?: Clock;
}

export function createPackageModule({
  packageRepository,
  categoryDirectory,
  faqReader,
  clock,
}: PackageModuleDeps) {
  const service = new PackageService(packageRepository, categoryDirectory, faqReader, clock);
  const appModule: AppModule = {
    name: 'packages',
    basePath: '/packages',
    router: createPackageRouter(new PackageController(service)),
  };
  return { module: appModule, service };
}

export { StaticPackageRepository } from './package.repository';
