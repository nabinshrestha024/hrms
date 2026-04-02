# HRMS — Multi-Tenant HR Management System

A modern, multi-tenant HRMS built with React 19, TypeScript, and Nx monorepo architecture.

## Quick Start

```bash
# Prerequisites: Node.js 20+ and pnpm 10+
pnpm install
pnpm dev         # http://localhost:4200
```

### Login credentials (mock)

| Email           | Password | Role                    |
| --------------- | -------- | ----------------------- |
| admin@gmail.com | Test@123 | Admin (all permissions) |
| hr@gmail.com    | Test@123 | HR Manager              |
| emp@gmail.com   | Test@123 | Employee                |

## Commands

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start dev server at :4200          |
| `pnpm build`     | Production build                   |
| `pnpm test`      | Run all unit tests                 |
| `pnpm lint`      | Lint all projects                  |
| `pnpm typecheck` | TypeScript type checking           |
| `pnpm e2e`       | Run Playwright e2e tests           |
| `pnpm format`    | Format with Prettier               |
| `pnpm generate`  | Scaffold a new route (interactive) |
| `pnpm clean`     | Remove build artifacts             |
| `pnpm reset`     | Delete node_modules and reinstall  |

## Multi-tenant Testing

Add to your hosts file (`C:\Windows\System32\drivers\etc\hosts` on Windows):

```
127.0.0.1   demo.erp.local
127.0.0.1   acme.erp.local
```

Then visit:

- `http://demo.erp.local:4200` — Demo Company (all modules)
- `http://acme.erp.local:4200` — Acme Corp (limited modules)

Or use query params: `http://localhost:4200?tenant=demo`

## Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** — System design, tech stack, dependency flow
- **[Developer Guide](docs/DEVELOPER-GUIDE.md)** — How to build features, patterns, conventions
- **[Contributing](CONTRIBUTING.md)** — Setup, workflow, PR guidelines
