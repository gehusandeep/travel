import type { AppModule } from '@/core/module';
import { BlogController } from './blog.controller';
import type { RelatedPackageReader } from './blog.ports';
import type { BlogRepository } from './blog.repository';
import { createBlogRouter } from './blog.routes';
import { BlogService } from './blog.service';

export interface BlogModuleDeps {
  blogRepository: BlogRepository;
  packageReferences: RelatedPackageReader;
}

export function createBlogModule({ blogRepository, packageReferences }: BlogModuleDeps) {
  const service = new BlogService(blogRepository, packageReferences);
  const appModule: AppModule = {
    name: 'blogs',
    basePath: '/blogs',
    router: createBlogRouter(new BlogController(service)),
  };
  return { module: appModule, service };
}

export { StaticBlogRepository } from './blog.repository';
