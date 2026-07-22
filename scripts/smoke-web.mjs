import { spawn } from 'node:child_process';

const port = '4173';
const child = spawn(
  'npm',
  ['run', 'dev', '--workspace', '@whatsapp-business/web', '--', '--port', port, '--strictPort'],
  { stdio: 'inherit' },
);
let exited = false;
child.on('exit', (code) => {
  exited = true;
  if (code !== null && code !== 0) process.exit(code);
});

async function waitForHomePage() {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (exited) throw new Error('Web process exited before readiness check completed.');
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      if (response.ok) return;
    } catch {
      // Retry until Vite binds the port or the deadline expires.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Web app did not serve the home page before the smoke timeout.');
}

try {
  await waitForHomePage();
  console.log('Web smoke readiness succeeded.');
  child.kill('SIGTERM');
} catch (error) {
  child.kill('SIGTERM');
  console.error(error);
  process.exit(1);
}
