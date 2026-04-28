# Phase 6.1 codemod — replace literal hex colors in className with theme tokens.
#
# Run from repo root:
#   pwsh -File scripts/codemod-hex-to-tokens.ps1
#
# Idempotent: re-running produces no changes once everything is migrated.

$ErrorActionPreference = 'Stop'

$replacements = @(
    # Backgrounds
    @{ from = 'bg-\[#F9FAFB\]';      to = 'bg-background' }
    @{ from = 'bg-\[#f9fafb\]';      to = 'bg-background' }
    @{ from = 'bg-\[#FAFAFA\]';      to = 'bg-card' }
    @{ from = 'bg-\[#fafafa\]';      to = 'bg-card' }
    @{ from = 'bg-\[#F4F4F5\]';      to = 'bg-muted' }
    @{ from = 'bg-\[#f4f4f5\]';      to = 'bg-muted' }
    @{ from = 'bg-\[#EEF2FF\]';      to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#eef2ff\]';      to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#E0E7FF\]';      to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#e0e7ff\]';      to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#312C85\]';      to = 'bg-secondary' }
    @{ from = 'bg-\[#312c85\]';      to = 'bg-secondary' }
    @{ from = 'bg-\[#4F39F6\]';      to = 'bg-primary' }
    @{ from = 'bg-\[#4f39f6\]';      to = 'bg-primary' }
    @{ from = 'bg-\[#615FFF\]';      to = 'bg-outline' }
    @{ from = 'bg-\[#615fff\]';      to = 'bg-outline' }
    @{ from = 'bg-\[#E7000B\]';      to = 'bg-destructive' }
    @{ from = 'bg-\[#e7000b\]';      to = 'bg-destructive' }
    @{ from = 'bg-\[#FEFCE8\]';      to = 'bg-chart-6' }
    @{ from = 'bg-\[#fefce8\]';      to = 'bg-chart-6' }
    @{ from = 'bg-\[#FEF9C2\]';      to = 'bg-chart-4' }
    @{ from = 'bg-\[#fef9c2\]';      to = 'bg-chart-4' }
    @{ from = 'bg-\[#DCFCE7\]';      to = 'bg-chart-2' }
    @{ from = 'bg-\[#dcfce7\]';      to = 'bg-chart-2' }
    @{ from = 'bg-\[#FFE2E2\]';      to = 'bg-chart-3' }
    @{ from = 'bg-\[#ffe2e2\]';      to = 'bg-chart-3' }
    @{ from = 'bg-\[#EFF6FF\]';      to = 'bg-alert-background' }
    @{ from = 'bg-\[#eff6ff\]';      to = 'bg-alert-background' }
    @{ from = 'bg-\[#F3F3FE\]';      to = 'bg-chart-7' }
    @{ from = 'bg-\[#f3f3fe\]';      to = 'bg-chart-7' }
    @{ from = 'bg-\[#F1F5F9\]';      to = 'bg-muted' }
    @{ from = 'bg-\[#f1f5f9\]';      to = 'bg-muted' }
    @{ from = 'bg-\[#F8FAFC\]';      to = 'bg-card' }
    @{ from = 'bg-\[#f8fafc\]';      to = 'bg-card' }
    @{ from = 'bg-\[#FFF7ED\]';      to = 'bg-chart-4' }
    @{ from = 'bg-\[#FFF085\]';      to = 'bg-chart-4' }
    @{ from = 'bg-\[#E5E7EB\]';      to = 'bg-border' }
    @{ from = 'bg-\[#e5e7eb\]';      to = 'bg-border' }

    # Foregrounds (text)
    @{ from = 'text-\[#09090B\]';    to = 'text-foreground' }
    @{ from = 'text-\[#09090b\]';    to = 'text-foreground' }
    @{ from = 'text-\[#71717A\]';    to = 'text-secondary-foreground' }
    @{ from = 'text-\[#71717a\]';    to = 'text-secondary-foreground' }
    @{ from = 'text-\[#18181B\]';    to = 'text-foreground' }
    @{ from = 'text-\[#18181b\]';    to = 'text-foreground' }
    @{ from = 'text-\[#A1A1AA\]';    to = 'text-muted-foreground' }
    @{ from = 'text-\[#a1a1aa\]';    to = 'text-muted-foreground' }
    @{ from = 'text-\[#312C85\]';    to = 'text-secondary' }
    @{ from = 'text-\[#312c85\]';    to = 'text-secondary' }
    @{ from = 'text-\[#4F39F6\]';    to = 'text-primary' }
    @{ from = 'text-\[#4f39f6\]';    to = 'text-primary' }
    @{ from = 'text-\[#615FFF\]';    to = 'text-outline' }
    @{ from = 'text-\[#615fff\]';    to = 'text-outline' }
    @{ from = 'text-\[#FAFAFA\]';    to = 'text-card' }
    @{ from = 'text-\[#fafafa\]';    to = 'text-card' }
    @{ from = 'text-\[#E7000B\]';    to = 'text-destructive' }
    @{ from = 'text-\[#e7000b\]';    to = 'text-destructive' }
    @{ from = 'text-\[#3F3F46\]';    to = 'text-foreground' }
    @{ from = 'text-\[#3f3f46\]';    to = 'text-foreground' }
    @{ from = 'text-\[#894B00\]';    to = 'text-badge-text-4' }
    @{ from = 'text-\[#894b00\]';    to = 'text-badge-text-4' }
    @{ from = 'text-\[#A6A6A6\]';    to = 'text-muted-foreground' }
    @{ from = 'text-\[#a6a6a6\]';    to = 'text-muted-foreground' }
    @{ from = 'text-\[#FFFFFF\]';    to = 'text-white' }
    @{ from = 'text-\[#ffffff\]';    to = 'text-white' }
    @{ from = 'text-\[#FFF\]';       to = 'text-white' }
    @{ from = 'text-\[#fff\]';       to = 'text-white' }
    @{ from = 'text-\[#010178\]';    to = 'text-badge-text-8' }
    @{ from = 'text-\[#155DFC\]';    to = 'text-primary' }
    @{ from = 'text-\[#155dfc\]';    to = 'text-primary' }
    @{ from = 'text-\[#2563EB\]';    to = 'text-badge-text-5' }
    @{ from = 'text-\[#2563eb\]';    to = 'text-badge-text-5' }
    @{ from = 'text-\[#16A34A\]';    to = 'text-badge-text-2' }
    @{ from = 'text-\[#16a34a\]';    to = 'text-badge-text-2' }
    @{ from = 'text-\[#DC2626\]';    to = 'text-badge-text-3' }
    @{ from = 'text-\[#dc2626\]';    to = 'text-badge-text-3' }
    @{ from = 'text-\[#CA8A04\]';    to = 'text-badge-text-4' }
    @{ from = 'text-\[#ca8a04\]';    to = 'text-badge-text-4' }
    @{ from = 'text-\[#4B5563\]';    to = 'text-badge-text-6' }
    @{ from = 'text-\[#4b5563\]';    to = 'text-badge-text-6' }
    @{ from = 'text-\[#00A63E\]';    to = 'text-badge-text-7' }
    @{ from = 'text-\[#00a63e\]';    to = 'text-badge-text-7' }
    @{ from = 'text-\[#4F46E5\]';    to = 'text-badge-text-1' }
    @{ from = 'text-\[#4f46e5\]';    to = 'text-badge-text-1' }

    # Borders
    @{ from = 'border-\[#E4E4E7\]';     to = 'border-border' }
    @{ from = 'border-\[#e4e4e7\]';     to = 'border-border' }
    @{ from = 'border-\[#E5E7EB\]';     to = 'border-border' }
    @{ from = 'border-\[#e5e7eb\]';     to = 'border-border' }
    @{ from = 'border-\[#F1F5F9\]';     to = 'border-border' }
    @{ from = 'border-\[#f1f5f9\]';     to = 'border-border' }
    @{ from = 'border-\[#615FFF\]';     to = 'border-outline' }
    @{ from = 'border-\[#615fff\]';     to = 'border-outline' }
    @{ from = 'border-\[#A1A1AA\]';     to = 'border-muted-foreground' }
    @{ from = 'border-\[#a1a1aa\]';     to = 'border-muted-foreground' }
    @{ from = 'border-\[#FEF9C2\]';     to = 'border-chart-4' }
    @{ from = 'border-\[#fef9c2\]';     to = 'border-chart-4' }
    @{ from = 'border-\[#FFF085\]';     to = 'border-chart-4' }
    @{ from = 'border-\[#fff085\]';     to = 'border-chart-4' }
    @{ from = 'border-l-\[#615FFF\]';   to = 'border-l-outline' }
    @{ from = 'border-l-\[#615fff\]';   to = 'border-l-outline' }
    @{ from = 'border-l-\[#4F39F6\]';   to = 'border-l-primary' }
    @{ from = 'border-l-\[#4f39f6\]';   to = 'border-l-primary' }
    @{ from = 'border-l-\[#312C85\]';   to = 'border-l-secondary' }
    @{ from = 'border-l-\[#312c85\]';   to = 'border-l-secondary' }
    @{ from = 'border-b-\[#E4E4E7\]';   to = 'border-b-border' }
    @{ from = 'border-b-\[#e4e4e7\]';   to = 'border-b-border' }
    @{ from = 'border-b-\[#4F39F6\]';   to = 'border-b-primary' }
    @{ from = 'border-b-\[#4f39f6\]';   to = 'border-b-primary' }

    # Stragglers
    @{ from = 'bg-\[#FFF\]';            to = 'bg-white' }
    @{ from = 'bg-\[#fff\]';            to = 'bg-white' }
    @{ from = 'bg-\[#FFFFFF\]';         to = 'bg-white' }
    @{ from = 'bg-\[#ffffff\]';         to = 'bg-white' }
    @{ from = 'bg-\[#18181B\]';         to = 'bg-foreground' }
    @{ from = 'bg-\[#18181b\]';         to = 'bg-foreground' }
    @{ from = 'bg-\[#C6D2FF\]';         to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#c6d2ff\]';         to = 'bg-primary-foreground' }
    @{ from = 'bg-\[#155DFC\]';         to = 'bg-badge-text-5' }
    @{ from = 'bg-\[#155dfc\]';         to = 'bg-badge-text-5' }
    @{ from = 'bg-\[#DBEAFE\]';         to = 'bg-chart-5' }
    @{ from = 'bg-\[#dbeafe\]';         to = 'bg-chart-5' }
    @{ from = 'text-\[#FF6467\]';       to = 'text-destructive' }
    @{ from = 'text-\[#ff6467\]';       to = 'text-destructive' }
)

$files = Get-ChildItem -Path 'apps/erp-shell/src' -Recurse -Include '*.tsx', '*.ts' |
    Where-Object { Select-String -Path $_.FullName -Pattern '\[#[0-9A-Fa-f]+\]' -Quiet }

# UTF-8 without BOM — Set-Content -Encoding utf8 writes a BOM in Windows
# PowerShell 5.1, which the no-bom ESLint rule then flags.
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$totalChanged = 0
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content
    foreach ($r in $replacements) {
        $content = [regex]::Replace($content, $r.from, $r.to)
    }
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
        $totalChanged++
    }
}

Write-Output "Updated $totalChanged file(s)."
