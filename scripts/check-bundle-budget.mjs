#!/usr/bin/env node
/**
 * Bundle-size budget check.
 *
 * Run after `pnpm nx run @org/erp-shell:build`:
 *   node scripts/check-bundle-budget.mjs
 *
 * Fails (exit 1) if either:
 *   - the initial app entry chunk (`index-*.js`) exceeds INITIAL_BUDGET_BYTES, or
 *   - any single non-vendor chunk exceeds CHUNK_BUDGET_BYTES.
 *
 * The vendor chunks (`react-vendor`, `ui-vendor`, `tanstack-vendor`) are
 * exempt from the chunk budget because they're a one-time cost shared
 * across every route.
 */

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ASSETS_DIR = 'apps/erp-shell/dist/assets';
const INITIAL_BUDGET_BYTES = 250 * 1024; // 250 KB raw
const CHUNK_BUDGET_BYTES = 100 * 1024; // 100 KB raw per non-vendor chunk
const VENDOR_CHUNKS = /^(react|ui|tanstack)-vendor-/;

function loadChunks() {
  return readdirSync(ASSETS_DIR)
    .filter((f) => f.endsWith('.js'))
    .map((name) => ({
      name,
      sizeBytes: statSync(join(ASSETS_DIR, name)).size,
    }));
}

function fmtKb(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

const chunks = loadChunks();
if (chunks.length === 0) {
  console.error(`No chunks found in ${ASSETS_DIR}. Did the build run?`);
  process.exit(1);
}

const failures = [];

const initial = chunks.find((c) => /^index-[^.]+\.js$/.test(c.name));
if (initial && initial.sizeBytes > INITIAL_BUDGET_BYTES) {
  failures.push(
    `Initial entry ${initial.name} is ${fmtKb(initial.sizeBytes)}, ` +
      `over the ${fmtKb(INITIAL_BUDGET_BYTES)} budget.`
  );
}

for (const c of chunks) {
  if (VENDOR_CHUNKS.test(c.name)) continue;
  // The initial entry has its own (larger) budget — skip the per-chunk one.
  if (initial && c.name === initial.name) continue;
  if (c.sizeBytes > CHUNK_BUDGET_BYTES) {
    failures.push(
      `Chunk ${c.name} is ${fmtKb(c.sizeBytes)}, over the ` +
        `${fmtKb(CHUNK_BUDGET_BYTES)} per-chunk budget.`
    );
  }
}

console.log(
  `Checked ${chunks.length} chunk(s) in ${ASSETS_DIR}.` +
    (initial ? ` Initial entry: ${fmtKb(initial.sizeBytes)}.` : '')
);

if (failures.length > 0) {
  console.error('\nBundle budget violations:');
  for (const msg of failures) console.error(`  - ${msg}`);
  process.exit(1);
}
console.log('All chunks within budget.');
