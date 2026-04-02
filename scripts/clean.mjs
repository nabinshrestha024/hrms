import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { platform } from 'node:os';
import { resolve } from 'node:path';

const dirs = ['node_modules', 'apps/erp-shell/node_modules', 'dist'];
const isWindows = platform() === 'win32';
const root = resolve(import.meta.dirname, '..');

for (const dir of dirs) {
  const full = resolve(root, dir);
  if (!existsSync(full)) {
    console.log(`  skip: ${dir} (not found)`);
    continue;
  }

  console.log(`  rm:   ${dir}`);
  try {
    if (isWindows) {
      // Windows: rmdir handles symlinks correctly
      execSync(`rmdir /s /q "${full}"`, { stdio: 'pipe' });
    } else {
      // macOS/Linux: rm -rf works fine
      execSync(`rm -rf "${full}"`, { stdio: 'pipe' });
    }
  } catch (e) {
    console.warn(`  warn: failed to remove ${dir} — ${e.message}`);
    console.warn(`        Try running as Administrator or close all editors/terminals`);
  }
}

console.log('  done');
