import type { Router } from 'express';

/**
 * Contract every feature module implements. New features plug into the API by
 * returning an AppModule from their factory; the core never changes (open/closed).
 */
export interface AppModule {
  readonly name: string;
  readonly basePath: `/${string}`;
  readonly router: Router;
}
