import { NextRouter } from 'next/router';
import { vi } from 'vitest';

export const createMockRouter = (router: Partial<NextRouter>): NextRouter => ({
  basePath: '',
  pathname: '/',
  route: '/',
  query: { page: '1', limit: '10', search: '' },
  asPath: '/',
  back: vi.fn(),
  beforePopState: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  push: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
  ...router,
});
