import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  it('returns API health', async () => {
    const moduleRef = await Test.createTestingModule({ controllers: [AppController] }).compile();
    expect(moduleRef.get(AppController).health()).toEqual({ status: 'ok', service: 'api' });
  });
});
