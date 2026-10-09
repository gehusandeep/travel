import path from 'node:path';
import { env } from '@/config/env';
import { logger } from '@/core/logger/logger';
import {
  authorize,
  createAuthenticate,
  createRateLimiters,
  type RateLimiters,
} from '@/core/middlewares';
import type { AppModule } from '@/core/module';
import { BcryptPasswordHasher } from '@/core/security/password-hasher';
import { JwtTokenService } from '@/core/security/token.service';
import { JsonFileStore } from '@/core/storage/json-file-store';
import { systemClock } from '@/core/time/clock';
import { blogsData } from '@/data/blogs.data';
import { categoriesData } from '@/data/categories.data';
import { faqsData } from '@/data/faqs.data';
import { packagesData } from '@/data/packages';
import { testimonialsData } from '@/data/testimonials.data';
import { createAuthModule, EnvAdminUserRepository } from '@/modules/auth';
import { createBlogModule, StaticBlogRepository } from '@/modules/blogs';
import { createCategoryModule, StaticCategoryRepository } from '@/modules/categories';
import { createDepartureModule } from '@/modules/departures';
import {
  CompositeEnquiryNotifier,
  createEnquiryModule,
  JsonFileEnquiryRepository,
  LogEnquiryNotifier,
  type Enquiry,
} from '@/modules/enquiries';
import { createFaqModule, StaticFaqRepository } from '@/modules/faqs';
import { createHealthModule } from '@/modules/health';
import { createPackageModule, StaticPackageRepository } from '@/modules/packages';
import { createTestimonialModule, StaticTestimonialRepository } from '@/modules/testimonials';

export interface Container {
  modules: AppModule[];
  rateLimiters: RateLimiters;
}

/**
 * Composition root: the only place that knows which concrete classes are used.
 * Moving from static data to a database means replacing the "Data sources"
 * block below. Services, controllers and routes stay untouched.
 */
export function buildContainer(): Container {
  // Infrastructure
  const clock = systemClock;
  const tokenService = new JwtTokenService(env.JWT_SECRET, env.JWT_EXPIRES_IN);
  const passwordHasher = new BcryptPasswordHasher();
  const rateLimiters = createRateLimiters(env.RATE_LIMIT_ALLOWLIST);
  const authenticate = createAuthenticate(tokenService);
  const adminGuard = [authenticate, authorize('ADMIN')];

  // Data sources (static for now)
  const packageRepository = new StaticPackageRepository(packagesData);
  const categoryRepository = new StaticCategoryRepository(categoriesData);
  const faqRepository = new StaticFaqRepository(faqsData);
  const testimonialRepository = new StaticTestimonialRepository(testimonialsData);
  const blogRepository = new StaticBlogRepository(blogsData);
  const enquiryRepository = new JsonFileEnquiryRepository(
    new JsonFileStore<Enquiry[]>(path.resolve(process.cwd(), env.ENQUIRY_STORE_FILE), () => []),
  );
  const adminUserRepository = new EnvAdminUserRepository({
    name: env.ADMIN_NAME,
    email: env.ADMIN_EMAIL,
    passwordHash: env.ADMIN_PASSWORD_HASH,
  });

  if (!adminUserRepository.isConfigured) {
    logger.warn('Admin login is disabled. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH to enable it.');
  }

  // Feature modules
  const categories = createCategoryModule({ categoryRepository, packageCounter: packageRepository });
  const faqs = createFaqModule({ faqRepository });
  const packages = createPackageModule({
    packageRepository,
    categoryDirectory: categories.service,
    faqReader: faqs.service,
    clock,
  });
  const departures = createDepartureModule({ departureReader: packages.service });
  const testimonials = createTestimonialModule({
    testimonialRepository,
    packageReferences: packageRepository,
  });
  const blogs = createBlogModule({ blogRepository, packageReferences: packageRepository });
  const enquiries = createEnquiryModule({
    enquiryRepository,
    packageLookup: packageRepository,
    notifier: new CompositeEnquiryNotifier([new LogEnquiryNotifier(logger)]),
    logger,
    clock,
    submitLimiter: rateLimiters.enquiry,
    adminGuard,
  });
  const auth = createAuthModule({
    adminUserRepository,
    passwordHasher,
    tokenService,
    authenticate,
    loginLimiter: rateLimiters.login,
  });

  return {
    rateLimiters,
    modules: [
      createHealthModule().module,
      auth.module,
      categories.module,
      packages.module,
      departures.module,
      faqs.module,
      testimonials.module,
      blogs.module,
      enquiries.module,
    ],
  };
}
