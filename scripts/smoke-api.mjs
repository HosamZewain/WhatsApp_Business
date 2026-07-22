import { spawn } from 'node:child_process';

const env = {
  ...process.env,
  DATABASE_URL:
    process.env.DATABASE_URL ??
    'postgresql://whatsapp:whatsapp@localhost:5432/whatsapp_business?schema=public',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
  REDIS_PORT: process.env.REDIS_PORT ?? '6379',
  PORT: process.env.PORT ?? '3000',
};

const child = spawn(process.execPath, ['apps/api/dist/src/main.js'], { env, stdio: 'inherit' });
let exited = false;
child.on('exit', (code) => {
  exited = true;
  if (code !== null && code !== 0) process.exit(code);
});

async function waitForApiReadiness() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (exited) throw new Error('API process exited before readiness check completed.');
    try {
      const healthResponse = await fetch(`http://127.0.0.1:${env.PORT}/health`);
      const healthBody = await healthResponse.json();
      const docsResponse = await fetch(`http://127.0.0.1:${env.PORT}/docs`);
      if (
        healthResponse.ok &&
        healthBody.status === 'ok' &&
        Object.keys(healthBody).length === 1 &&
        docsResponse.ok
      )
        return;
    } catch {
      // Retry until the process binds the port or the deadline expires.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('API did not serve health and Swagger docs before the smoke timeout.');
}

try {
  await waitForApiReadiness();
  console.log('API smoke readiness succeeded.');
  child.kill('SIGTERM');
} catch (error) {
  child.kill('SIGTERM');
  console.error(error);
  process.exit(1);
}
