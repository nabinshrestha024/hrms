#!/usr/bin/env node

/**
 * Interactive script to add shadcn/ui primitives to libs/shared/ui.
 *
 * Usage:
 *   pnpm ui:add              — interactive picker
 *   pnpm ui:add button       — add specific component
 *   pnpm ui:add button input — add multiple components
 */

import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { createInterface } from 'node:readline';

const ROOT = resolve(import.meta.dirname, '..');
const PRIMITIVES_DIR = resolve(ROOT, 'libs/shared/ui/src/primitives');

// Components already installed
function getInstalled() {
  try {
    return readdirSync(PRIMITIVES_DIR)
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => basename(f, '.tsx'));
  } catch {
    return [];
  }
}

// Get all available components from shadcn registry
async function getRegistry() {
  try {
    const res = await fetch('https://ui.shadcn.com/registry/index.json');
    const data = await res.json();
    return data
      .filter((c) => c.type === 'registry:ui')
      .map((c) => c.name)
      .sort();
  } catch {
    // Fallback list of common components
    return [
      'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
      'badge', 'breadcrumb', 'button', 'calendar', 'card', 'carousel',
      'chart', 'checkbox', 'collapsible', 'command', 'context-menu',
      'dialog', 'drawer', 'dropdown-menu', 'form', 'hover-card', 'input',
      'input-otp', 'label', 'menubar', 'navigation-menu', 'pagination',
      'popover', 'progress', 'radio-group', 'resizable', 'scroll-area',
      'select', 'separator', 'sheet', 'sidebar', 'skeleton', 'slider',
      'sonner', 'switch', 'table', 'tabs', 'textarea', 'toast',
      'toggle', 'toggle-group', 'tooltip',
    ];
  }
}

function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

async function main() {
  const args = process.argv.slice(2);
  const installed = getInstalled();

  if (args.length > 0) {
    // Direct install mode
    const components = args.join(' ');
    console.log(`\nAdding: ${components}\n`);
    run(`pnpm dlx shadcn@latest add ${components} --yes --overwrite`);
    postInstall(args);
    return;
  }

  // Interactive mode — show available components
  const registry = await getRegistry();

  console.log('\n📦 shadcn/ui components\n');
  console.log('Installed components are marked with ✓\n');

  registry.forEach((name, i) => {
    const mark = installed.includes(name) ? '  ✓' : '   ';
    const num = String(i + 1).padStart(3);
    console.log(`${mark} ${num}. ${name}`);
  });

  console.log('\nEnter component names (space-separated) or numbers:');
  console.log('Example: checkbox radio-group  OR  13 30\n');

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const answer = await new Promise((resolve) => {
    rl.question('> ', (ans) => {
      rl.close();
      resolve(ans.trim());
    });
  });

  if (!answer) {
    console.log('No components selected.');
    return;
  }

  // Parse selection — could be names or numbers
  const selections = answer.split(/[\s,]+/).map((s) => {
    const num = parseInt(s, 10);
    if (!isNaN(num) && num >= 1 && num <= registry.length) {
      return registry[num - 1];
    }
    return s;
  });

  const valid = selections.filter((s) => registry.includes(s));

  if (valid.length === 0) {
    console.log('No valid components found in selection.');
    return;
  }

  console.log(`\nAdding: ${valid.join(', ')}\n`);
  run(`pnpm dlx shadcn@latest add ${valid.join(' ')} --yes --overwrite`);
  postInstall(valid);
}

function postInstall(components) {
  console.log('\n✅ Done! Components added to libs/shared/ui/src/primitives/');
  console.log('\nImport usage:');
  components.forEach((c) => {
    const pascal = c
      .split('-')
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join('');
    console.log(`  import { ${pascal} } from '@erp/ui';`);
  });
  console.log('\n⚠️  Remember to update libs/shared/ui/src/index.ts exports if needed.');
  console.log('⚠️  Check generated imports — change @/lib/utils → @erp/utils if needed.\n');
}

main().catch(console.error);
