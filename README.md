# Autak.org

Website of [Autak e.V.](https://autak.org) — Next.js App Router, hosted on Vercel.

## Edit content (no coding)

News posts, open positions and shop items are **Markdown files**. Changing a
file on GitHub is enough; a developer is not needed for each post.

**Start here:** [USERGUIDE.md](USERGUIDE.md) — add, edit and delete news, jobs and shop items (German + English).

Short version in the content folder: [editorial/README.md](editorial/README.md)

| You want to change | Open |
|---|---|
| A news item | [`editorial/news/`](editorial/news/) |
| An internship / thesis | [`editorial/positions/`](editorial/positions/) |
| A shop product | [`editorial/shop/`](editorial/shop/) |

Workflow: edit or add a `.md` file → commit on `main` → Vercel rebuilds the
site. German and English fields are both required.

Team, projects and legal pages are still in TypeScript under `src/content/`.
Ask a developer for those, or for a new type of page.

## Develop

Requires Node 22 (`see .nvmrc`).

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). After a Markdown change,
restart `npm run dev` if the new file does not show up.

```sh
npm run build
npm start
npm run lint
npm run typecheck
```

Machine-translated locales (FR, NL, ES, TR) are generated from English:

```sh
npm run translate
```

## Layout

| Path | Purpose |
|---|---|
| `editorial/` | Volunteer-editable Markdown (news, positions, shop) |
| `src/content/` | Typed loaders plus team, projects, legal, media |
| `src/i18n/dictionaries/` | UI copy (nav, buttons, page chrome) |
| `src/app/[locale]/` | Pages |
| `public/images/` | Photos referenced from Markdown as `/images/...` |
| `content/` | Legacy HTML snapshot of the old one.com site |
