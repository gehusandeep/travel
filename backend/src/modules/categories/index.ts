import type { AppModule } from '@/core/module';
import { CategoryController } from './category.controller';
import type { PackageCounter } from './category.ports';
import type { CategoryRepository } from './category.repository';
import { createCategoryRouter } from './category.routes';
import { CategoryService } from './category.service';

export interface CategoryModuleDeps {
  categoryRepository: CategoryRepository;
  packageCounter: PackageCounter;
}

/** Composition root of the categories feature. */
export function createCategoryModule({ categoryRepository, packageCounter }: CategoryModuleDeps) {
  const service = new CategoryService(categoryRepository, packageCounter);
  const appModule: AppModule = {
    name: 'categories',
    basePath: '/categories',
    router: createCategoryRouter(new CategoryController(service)),
  };
  return { module: appModule, service };
}

export { StaticCategoryRepository } from './category.repository';
