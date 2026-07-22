import { spawn } from 'node:child_process';

const child = spawn(
  'npm',
  ['run', 'dev', '--workspace', '@whatsapp-business/web', '--', '--port', '4173'],
  { stdio: 'inherit' },
);
const timeout = setTimeout(() => {
  child.kill('SIGTERM');
  console.log('Web smoke start succeeded.');
}, 3000);
child.on('exit', (code, signal) => {
  clearTimeout(timeout);
  if (signal === 'SIGTERM') process.exit(0);
  process.exit(code ?? 1);
});
