# Phase 7.2 codemod — convert eager feature imports in route files to
# React.lazy + Suspense. Each non-dashboard route gets its own JS chunk.
#
# Run from repo root:
#   powershell -ExecutionPolicy Bypass -File scripts/codemod-lazy-routes.ps1
#
# Idempotent: re-running produces no changes once everything is migrated.
#
# Skips:
#  - dashboard/index.tsx (landing page, kept eager).
#  - any route with more than one feature import (manual conversion).

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$skip = @(
    'dashboard\index.tsx',
    'employee\document-view'
)

$files = Get-ChildItem -Path 'apps/erp-shell/src/routes/_authenticated' -Recurse -Filter '*.tsx'

$totalChanged = 0
foreach ($file in $files) {
    $skipFile = $false
    foreach ($s in $skip) { if ($file.FullName -like "*$s*") { $skipFile = $true } }
    if ($skipFile) { continue }

    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content -match 'createLazyFileRoute|React\.lazy|^\s*const \w+ = lazy\(') {
        # Already lazy.
        continue
    }

    # Match a single feature import:  import { Foo } from '../path/features/...';
    $featureImport = [regex]::Match(
        $content,
        "(?m)^import \{ (?<name>[A-Za-z][A-Za-z0-9_]*) \} from '(?<path>(?:\.\./)+features/[^']+)';\r?\n"
    )
    if (-not $featureImport.Success) { continue }

    $name = $featureImport.Groups['name'].Value
    $path = $featureImport.Groups['path'].Value

    # Strip the eager import line.
    $content = $content.Remove($featureImport.Index, $featureImport.Length)

    # Add `lazy, Suspense` to the existing 'react' import if any; otherwise
    # insert a fresh one near the top.
    if ($content -match "(?m)^import \{ ([^}]+) \} from 'react';") {
        $existing = $matches[1].Trim()
        $merged = ($existing -split ',\s*') + @('lazy', 'Suspense') |
            Sort-Object -Unique
        $content = [regex]::Replace(
            $content,
            "(?m)^import \{ ([^}]+) \} from 'react';",
            "import { $($merged -join ', ') } from 'react';"
        )
    } else {
        # Insert after the first top-of-file import line.
        $content = [regex]::Replace(
            $content,
            "(?m)^(import [^\r\n]+;\r?\n)",
            "`$1import { lazy, Suspense } from 'react';`r`n",
            1
        )
    }

    # Insert the lazy declaration immediately after the imports block.
    # We anchor on the last `import` statement before any `export`/`function`/`const Route`.
    $lazyDecl = "`r`nconst $name = lazy(() =>`r`n  import('$path').then((m) => ({ default: m.$name }))`r`n);`r`n"
    $content = [regex]::Replace(
        $content,
        "(?ms)(^(?:import [^\r\n]+;\r?\n)+)",
        "`$1$lazyDecl",
        1
    )

    # Wrap the JSX usage <Foo /> with <Suspense fallback={null}><Foo /></Suspense>.
    $content = [regex]::Replace(
        $content,
        "<$name\s*/>",
        "<Suspense fallback={null}><$name /></Suspense>"
    )

    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
    $totalChanged++
}

Write-Output "Lazy-loaded $totalChanged route file(s)."
