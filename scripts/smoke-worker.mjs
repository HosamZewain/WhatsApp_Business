import { spawn } from 'node:child_process';

const env = {
  ...process.env,
  REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
  REDIS_PORT: process.env.REDIS_PORT ?? '6379',
};

const child = spawn(process.execPath, ['apps/worker/dist/src/main.js'], { env });
let output = '';
let exited = false;

child.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stdout.write(text);
});
child.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  output += text;
  process.stderr.write(text);
});
child.on('exit', (code) => {
  exited = true;
  if (!output.includes('Worker application context ready.') && code !== 0) process.exit(code ?? 1);
});

async function waitForWorkerContext() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (output.includes('Worker application context ready.')) return;
    if (exited) throw new Error('Worker process exited before readiness check completed.');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Worker application context was not ready before the smoke timeout.');
}

try {
  await waitForWorkerContext();
  console.log('Worker smoke readiness succeeded.');
  child.kill('SIGTERM');
} catch (error) {
  child.kill('SIGTERM');
  console.error(error);
  process.exit(1);
}
