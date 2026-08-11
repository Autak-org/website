# Autak.org — Next.js

Static snapshot of [autak.org](https://autak.org) (April 2026, from one.com), now running on Next.js App Router.

## Setup

```sh
npm install
```

If `node_modules` was copied from another project, prefer a clean install:

```sh
rm -rf node_modules
npm install
```

## Develop

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```sh
npm run build
npm start
```

## Project layout

| Path | Purpose |
|------|---------|
| `content/` | Legacy HTML pages (DE + EN) |
| `public/onewebstatic` | Original CSS/JS |
| `public/onewebmedia`, `public/webshopmedia` | Media |
| `src/app/[[...slug]]/route.ts` | Serves HTML at the original URLs (`/`, `/home/shop`, `/en-1`, …) |
| `src/app/api/google-fonts` | Replaces `google-fonts.php` |

Extensionless URLs work the same as the old Caddy `try_files` setup.
