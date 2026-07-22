import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeAll(() => {
    process.env.DATABASE_URL =
      'postgresql://whatsapp:whatsapp@localhost:5432/whatsapp_business?schema=public';
  });
  it('bootstraps the foundation module without feature controllers', async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    expect(moduleRef).toBeDefined();
    await moduleRef.close();
  });
});
