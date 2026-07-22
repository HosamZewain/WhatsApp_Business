export const CORRELATION_ID_HEADER = 'x-correlation-id';

export type HealthStatus = {
  status: 'ok';
  service: 'api' | 'worker' | 'web';
};
