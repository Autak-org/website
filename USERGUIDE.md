# Autak website — user guide

This guide is for **board members, volunteers and anyone who is not a developer**.
You can add, change and delete news, job ads and shop items by editing text files
on GitHub. You do not need to install anything or write code.

German is the main language on the site. **Always fill in both German (`_de`) and English (`_en`).**

---

## 1. What you can do yourself

| Task | You can do it? | Where |
|---|---|---|
| Add / edit / delete a **news** post | Yes | [`editorial/news/`](editorial/news/) |
| Add / edit / delete an **internship or thesis** | Yes | [`editorial/positions/`](editorial/positions/) |
| Add / edit / delete a **shop** product | Yes | [`editorial/shop/`](editorial/shop/) |
| Upload a **photo** for those items | Yes | [`public/images/media/`](public/images/media/) |
| Change navigation, buttons, homepage slogans | No — ask a developer | `src/i18n/dictionaries/` |
| Change the **team / alumni** list | No — ask a developer | `src/content/members.ts` |
| Change **project** pages | No — ask a developer | `src/content/projects.ts` |
| Change **legal** pages (Impressum, privacy, statutes) | No — ask a developer | legal content |
| Change layout, colours, new page types | No — ask a developer | — |

After you save on GitHub, Vercel rebuilds the site. Wait **2–5 minutes**, then
hard-refresh the page (Ctrl+Shift+R / Cmd+Shift+R).

You need **write access** to the GitHub repository. If you cannot edit files,
ask whoever runs the repo to invite you.

---

## 2. How a content file looks

Each item is one Markdown file. The important part is the block between the
two `---` lines (this is called **frontmatter**). The site reads those fields.

Example news file `editorial/news/prototype-two.md`:

```md
---
date: 2025-11-18
category: prototype
title_de: Zweiter Prototyp geht in den Aufbau
title_en: Second prototype goes into assembly
excerpt_de: Die gefrästen Aluteile für den zweiten Rollstuhl sind da.
excerpt_en: The milled aluminium parts for the second wheelchair have arrived.
image: /images/media/wheelchair-detail.jpg
image_alt_de: Detailaufnahme des Rollstuhlrahmens.
image_alt_en: Close-up of the wheelchair frame.
---
```

Rules:

- Do not remove the `---` lines.
- Put a space after the colon: `title_de: Mein Titel`
- Do not use Tab for indent. If a value needs several lines, the extra lines
  start with **two spaces**.
- Files that start with `_` (for example `_template.md`) are **hidden**. Copy
  them; do not rename the template itself into a live post.

### File names

The file name becomes the item’s id.

| Good | Bad |
|---|---|
| `campus-festival.md` | `Campus Festival.md` |
| `zweite-prototyp.md` | `zweite_prototyp.md` |
| `3d-modeling.md` | `3D Modellierung.md` |

Use **lowercase letters, numbers and hyphens only**. No spaces, umlauts
(`ä ö ü ß`) or punctuation.

---

## 3. GitHub: edit an existing item

1. Open the repository on GitHub.
2. Go to the folder (`editorial/news/`, `editorial/positions/` or `editorial/shop/`).
3. Click the file you want.
4. Click the **pencil** (Edit this file).
5. Change the text.
6. Scroll down to **Commit changes**.
7. Write a short message, for example `News: fix CYBATHLON date`.
8. Click **Commit changes** (straight to `main` is fine for content).

Wait for the deploy, then check the live site.

---

## 4. GitHub: add a new item

1. Open the matching `_template.md` and copy **everything**:
   - News: [`editorial/news/_template.md`](editorial/news/_template.md)
   - Positions: [`editorial/positions/_template.md`](editorial/positions/_template.md)
   - Shop: [`editorial/shop/_template.md`](editorial/shop/_template.md)
2. In that same folder click **Add file → Create new file**.
3. At the top, type the file name including `.md`  
   Example: `editorial/news/campus-festival.md`
4. Paste the template, fill every field.
5. Commit, same as above.

If you also need a **new photo**, upload it first (section 7), then put its
path in `image:`.

---

## 5. GitHub: delete an item

1. Open the `.md` file.
2. Click the **trash** icon (Delete this file).
3. Commit the deletion, for example `News: remove old lasertag post`.

The item disappears from the site after the next deploy. The photo file in
`public/images/` is **not** deleted automatically. You can leave it, or delete
the image in a second commit if nothing else uses it.

---

## 6. News posts

**Folder:** [`editorial/news/`](editorial/news/)  
**Shows on:** homepage (latest 3), News page, For users page.

### Add

Copy `_template.md` → new file `short-english-slug.md` → fill fields → commit.

### Edit

Open the existing `.md` → change fields → commit.

### Delete

Delete the `.md` file → commit.

### Fields

| Field | Required | What to write |
|---|---|---|
| `date` | Yes | `YYYY-MM-DD` (example `2026-08-19`). Newest date appears first. |
| `category` | Yes | Exactly one of: `prototype` · `event` · `press` · `team` · `product` |
| `title_de` / `title_en` | Yes | Headline |
| `excerpt_de` / `excerpt_en` | Yes | One or two sentences for the card |
| `image` | Yes | Path starting with `/images/…` (see section 7) |
| `image_alt_de` / `image_alt_en` | Yes | Short description of the photo (accessibility) |
| `link_href` | No | Full URL, e.g. a YouTube video |
| `link_label_de` / `link_label_en` | Only if `link_href` is set | Button text, e.g. `Beitrag ansehen` / `Watch the feature` |

`category` must match **exactly** (lowercase). A typo such as `Event` or
`presse` will break the deploy.

To **remove a link** from a post, delete the three `link_` lines entirely.

---

## 7. Photos

1. On GitHub open [`public/images/media/`](public/images/media/).
2. **Add file → Upload files**.
3. Drop a JPG or PNG. Keep it under **about 1 MB**. Landscape photos work best.
4. Commit the upload.
5. In your Markdown file set:

```md
image: /images/media/your-file-name.jpg
```

Notes:

- Do **not** write `public/` in that path.
- The file name in the folder and in `image:` must match, including `.jpg` / `.png`.
- Reuse an existing photo if you already have one (look at other news files).
- Person photos for the team page are **not** this workflow; ask a developer.

---

## 8. Internships and theses (positions)

**Folder:** [`editorial/positions/`](editorial/positions/)  
**Shows on:** Positions page and For members.

### Add / edit / delete

Same GitHub steps as news. Copy [`_template.md`](editorial/positions/_template.md).

### Fields

| Field | Required | What to write |
|---|---|---|
| `kind` | Yes | `thesis` · `internship` · `both` |
| `order` | Yes | Number. **Smaller = higher** on the page (`1` is first). |
| `title_de` / `title_en` | Yes | Job title |
| `field_de` / `field_en` | Yes | Study field, e.g. `Maschinenbau` |
| `task_de` / `task_en` | Yes | What they will do |
| `learn_de` / `learn_en` | Yes | What they will learn |

To **reorder** cards, change `order` (give unique numbers: 1, 2, 3…). You do
not need to rename files.

---

## 9. Shop products

**Folder:** [`editorial/shop/`](editorial/shop/)  
**Shows on:** Shop page.

### Add / edit / delete

Same GitHub steps. Copy [`_template.md`](editorial/shop/_template.md).

### Fields

| Field | Required | What to write |
|---|---|---|
| `availability` | Yes | `available` · `soon` · `sold-out` |
| `order` | Yes | Number. Smaller = higher on the page. |
| `name_de` / `name_en` | Yes | Product name |
| `summary_de` / `summary_en` | Yes | Short description |
| `image` | Yes | `/images/…` path |
| `image_alt_de` / `image_alt_en` | Yes | Photo description |
| `price` | No | e.g. `12 €` — only if you want a price shown |

When a product goes on sale, set `availability: available`. When it is gone,
set `availability: sold-out` rather than deleting it, unless you want it off
the page completely.

---

## 10. After you commit

1. GitHub → **Actions** or the Vercel dashboard: wait until the deploy is green.
2. Open [autak.org](https://autak.org) (or the preview URL on a pull request).
3. Hard-refresh. If you still see old text, try a private/incognito window.

If the deploy is **red**, your Markdown almost always has:

- a missing required field, or
- a wrong `category` / `kind` / `availability` value, or
- a broken `---` block (deleted a dash, or a field without a space after `:`).

Fix the file and commit again. You do not need a developer for that.

---

## 11. Quick recipes

**“We were at an event yesterday.”**  
→ New file in `editorial/news/` · `category: event` · today’s `date` · upload a photo.

**“This internship is filled.”**  
→ Delete `editorial/positions/that-file.md`, or leave it and ask a developer if
you would rather show a “filled” state (that state does not exist yet).

**“Connie is in stock.”**  
→ Edit `editorial/shop/connie.md` · set `availability: available` · add `price` if needed.

**“Typo in a headline.”**  
→ Open the `.md` · fix `title_de` or `title_en` · commit.

**“Wrong photo.”**  
→ Upload the new image · change the `image:` line to the new file name.

**“Need this in French too.”**  
→ You only maintain German and English. Other languages are generated from
English by a developer (`npm run translate`).

---

## 12. Deutsch — Kurzüberblick

Du brauchst **kein Programmieren**. News, Stellen und Shop liegen als `.md`-Dateien
in `editorial/`.

1. Auf GitHub die Datei öffnen → Stift → ändern → **Commit changes**.
2. Neu: `_template.md` kopieren → **Add file → Create new file** → `mein-titel.md`.
3. Löschen: Datei öffnen → Papierkorb → committen.
4. Bilder nach `public/images/media/` hochladen, dann  
   `image: /images/media/dateiname.jpg` (ohne `public`).
5. Immer `_de` **und** `_en` ausfüllen.
6. 2–5 Minuten warten, Seite hart neu laden.

Dateinamen: nur `a-z`, `0-9` und `-`. Keine Umlaute, keine Leerzeichen.

Wenn der Deploy fehlschlägt: Pflichtfeld fehlt oder `category` / `kind` /
`availability` ist falsch geschrieben. Datei korrigieren und erneut committen.

Team, Projekte, Rechtstexte und Navigation bitte an eine Entwicklerin /
einen Entwickler geben.
