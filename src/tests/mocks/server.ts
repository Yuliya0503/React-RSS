import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const createServer = () => {
  const server = setupServer(...handlers);
  return server;
};
