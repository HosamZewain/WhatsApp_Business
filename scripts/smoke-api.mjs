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
const timeout = setTimeout(() => {
  child.kill('SIGTERM');
  console.log('API smoke start succeeded.');
}, 3000);
child.on('exit', (code, signal) => {
  clearTimeout(timeout);
  if (signal === 'SIGTERM') process.exit(0);
  process.exit(code ?? 1);
});
