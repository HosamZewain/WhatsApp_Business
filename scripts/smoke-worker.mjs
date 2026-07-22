import { spawn } from 'node:child_process';

const env = {
  ...process.env,
  REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
  REDIS_PORT: process.env.REDIS_PORT ?? '6379',
};

const child = spawn(process.execPath, ['apps/worker/dist/src/main.js'], { env, stdio: 'inherit' });
const timeout = setTimeout(() => {
  child.kill('SIGTERM');
  console.log('Worker smoke start succeeded.');
}, 3000);
child.on('exit', (code, signal) => {
  clearTimeout(timeout);
  if (signal === 'SIGTERM') process.exit(0);
  process.exit(code ?? 1);
});
