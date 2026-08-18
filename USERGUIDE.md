# Autak website — user guide

This guide is for **board members, volunteers and anyone who is not a developer**.
You can add, change and delete almost all public content by editing text files
on GitHub. You do not need to install anything or write code.

German is the main language on the site. **Always fill in both German (`_de`) and English (`_en`).**

---

## 1. What you can do yourself

| Task | You can do it? | Where |
|---|---|---|
| Add / edit / delete a **news** post | Yes | [`editorial/news/`](editorial/news/) |
| Add / edit / delete an **internship or thesis** | Yes | [`editorial/positions/`](editorial/positions/) |
| Add / edit / delete a **shop** product | Yes | [`editorial/shop/`](editorial/shop/) |
| Add / edit / delete **team, alumni, supporters** | Yes | [`editorial/members/`](editorial/members/) |
| Add / edit / delete a **project** page | Yes | [`editorial/projects/`](editorial/projects/) |
| Add / edit **quotes** (users, members, partners) | Yes | [`editorial/voices/`](editorial/voices/) |
| Add / edit **press citations** | Yes | [`editorial/press/`](editorial/press/) |
| Add / edit **videos** | Yes | [`editorial/videos/`](editorial/videos/) |
| Edit **workshop / capability** lines | Yes | [`editorial/capabilities/`](editorial/capabilities/) |
| Upload a **photo** | Yes | [`public/images/`](public/images/) |
| Change navigation, buttons, homepage slogans | No — ask a developer | `src/i18n/dictionaries/` |
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
- Lines that start with `#` inside the `---` block are comments. They do not
  appear on the site.

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
2. Go to the folder (for example `editorial/news/` or `editorial/members/`).
3. Click the file you want.
4. Click the **pencil** (Edit this file).
5. Change the text.
6. Scroll down to **Commit changes**.
7. Write a short message, for example `News: fix CYBATHLON date`.
8. Click **Commit changes** (straight to `main` is fine for content).

Wait for the deploy, then check the live site.

---

## 4. GitHub: add a new item

1. Open the matching `_template.md` and copy **everything**. Templates:

   | Kind | Template |
   |---|---|
   | News | [`editorial/news/_template.md`](editorial/news/_template.md) |
   | Positions | [`editorial/positions/_template.md`](editorial/positions/_template.md) |
   | Shop | [`editorial/shop/_template.md`](editorial/shop/_template.md) |
   | People | [`editorial/members/_template.md`](editorial/members/_template.md) |
   | Quotes | [`editorial/voices/_template.md`](editorial/voices/_template.md) |
   | Press | [`editorial/press/_template.md`](editorial/press/_template.md) |
   | Videos | [`editorial/videos/_template.md`](editorial/videos/_template.md) |
   | Capabilities | [`editorial/capabilities/_template.md`](editorial/capabilities/_template.md) |
   | Project (whole folder) | [`editorial/projects/_template/`](editorial/projects/_template/) |

2. In that same folder click **Add file → Create new file**.
3. At the top, type the file name including `.md`  
   Example: `editorial/news/campus-festival.md`
4. Paste the template, fill every field.
5. Commit, same as above.

If you also need a **new photo**, upload it first (section 7), then put its
path in `image:` / `photo:` / `cover:` / `src:`.

For a **new project**, copy the whole `_template` folder (see section 13).

---

## 5. GitHub: delete an item

1. Open the `.md` file.
2. Click the **trash** icon (Delete this file).
3. Commit the deletion, for example `News: remove old lasertag post`.

For a **project**, delete the whole folder (`editorial/projects/the-slug/`),
not only `index.md`.

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

**News, shop, projects, press stills**

1. On GitHub open [`public/images/media/`](public/images/media/).
2. **Add file → Upload files**.
3. Drop a JPG or PNG. Keep it under **about 1 MB**. Landscape photos work best.
4. Commit the upload.
5. In your Markdown file set:

```md
image: /images/media/your-file-name.jpg
```

**Team / alumni / supporters**

1. Upload to [`public/images/people/`](public/images/people/).
2. Name the file like the Markdown slug: `manuel-wessely.jpg` for
   `editorial/members/manuel-wessely.md`.
3. You can omit `photo:` — the site then uses `/images/people/{slug}.jpg`.
4. Or set `photo:` yourself if the file name is different.

Notes:

- Do **not** write `public/` in that path.
- The file name in the folder and in `image:` / `photo:` must match, including `.jpg` / `.png`.
- Reuse an existing photo if you already have one (look at other files).

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

## 10. Team, alumni and supporters

**Folder:** [`editorial/members/`](editorial/members/)  
**Shows on:** About page (three lists: Team, Alumni, Supporters).

One file per person. The file name is the slug, for example `manuel-wessely.md`.
The **`group`** field decides which list they appear in:

| `group` | List on the About page |
|---|---|
| `team` | Current team |
| `alumni` | Former members |
| `supporters` | Mentors, patrons, people who helped |

Use exactly those three words, lowercase. `Team` or `alumnus` will break the deploy.

### Add a person

1. Upload their portrait first (optional but recommended):
   [`public/images/people/`](public/images/people/) → **Add file → Upload files**.  
   Name it like the Markdown file: `anna-mueller.jpg` for `anna-mueller.md`.
2. Open [`editorial/members/_template.md`](editorial/members/_template.md) and copy everything.
3. In `editorial/members/` click **Add file → Create new file**.
4. Name it `first-last.md` (lowercase, hyphens, no umlauts: `anna-mueller.md` not `Anna Müller.md`).
5. Paste the template and fill it in. Set `group` to `team`, `alumni` or `supporters`.
6. Set `order` to the next number in **that** list (`1` is first in the list). Look at the other files in the same group if you are unsure.
7. Commit, for example `Members: add Anna Müller to team`.

Example for a new team member `editorial/members/anna-mueller.md`:

```md
---
group: team
order: 14
name: Anna Müller
photo: /images/people/anna-mueller.jpg
role_de: Mitglied
role_en: Member
tags: #Informatik, #Firmware
bio_de: Kurzer Satz über Anna auf Deutsch.
bio_en: A short sentence about Anna in English.
---
```

Example for alumni — only `group` changes:

```md
group: alumni
```

Example for a supporter:

```md
group: supporters
role_de: Mentorin
role_en: Mentor
```

You can leave `role_`, `tags` and `bio_` out if you do not have them. If you
omit `photo:`, the site looks for `/images/people/anna-mueller.jpg` automatically.

### Edit a person

Open their `.md` file → change name, bio, tags, photo or `order` → commit.

### Move team → alumni (someone left)

Do **not** create a second file. Open the existing one and change:

```md
group: alumni
order: 1
```

Pick an `order` that fits in the alumni list. After the next deploy they
disappear from Team and appear under Alumni.

### Delete a person

Open the `.md` file → trash icon → commit, for example
`Members: remove old placeholder`. Delete the portrait in
`public/images/people/` only if nothing else uses it.

### Fields

| Field | Required | What to write |
|---|---|---|
| `group` | Yes | `team` · `alumni` · `supporters` |
| `order` | Yes | Number. Smaller = earlier **inside that group**. |
| `name` | Yes | Display name (one language is enough) |
| `photo` | No | `/images/people/…` — defaults to `/images/people/{slug}.jpg` |
| `role_de` / `role_en` | No | Board role or supporter role. Set **both** or neither. |
| `tags` | No | Comma-separated, e.g. `#Informatik, #Vertrauensperson` |
| `bio_de` / `bio_en` | No | Short bio. Set **both** or neither. |

---

## 11. Quotes (voices)

**Folder:** [`editorial/voices/`](editorial/voices/)  
**Shows on:** For users (`group: users`), For members (`group: members`),
For partners (`group: partners`).

**Do not invent a quote and put a real name next to it.** Only publish text
the person has approved.

### Fields

| Field | Required | What to write |
|---|---|---|
| `group` | Yes | `users` · `members` · `partners` |
| `order` | Yes | Number inside that group |
| `name` | Yes | Attribution |
| `role_de` / `role_en` | Yes | Context, e.g. `Feldtest Aachen, 2025` |
| `quote_de` / `quote_en` | Yes | The quote |
| `avatar` | No | `/images/people/…` if you have a portrait |

---

## 12. Press, videos and capabilities

### Press citations

**Folder:** [`editorial/press/`](editorial/press/)  
**Shows on:** homepage and For partners.

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Number. Smaller = higher. |
| `outlet` | Yes | Medium, e.g. `MDR — Einfach genial` |
| `year` | Yes | `2023` |
| `title_de` / `title_en` | Yes | What the piece is about |
| `href` | No | Full URL if you have one |

### Videos

**Folder:** [`editorial/videos/`](editorial/videos/)  
One file per video. Projects **reuse** these by id (the file name without `.md`).

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Fallback sort |
| `poster` | Yes | Still image, `/images/…` |
| `title_de` / `title_en` | Yes | Caption |
| `youtube` or `file` | One of them | YouTube **id** only (`F5Ns46SNK1s`), or `/videos/name.mp4` |
| `meta` | No | Extra line, e.g. `2023` |
| `lists` | No | Where the clip appears: `showcase`, `usage`, `events` (comma-separated) |
| `showcase_order` / `usage_order` / `events_order` | No | Order **inside** that gallery |

`lists: showcase` → For partners gallery.  
`lists: usage` → For users.  
`lists: events` → For members.

To attach a video to a **project page**, add its id to that project’s
`videos:` line. You do not copy the video file into the project folder.

Upload MP4s to [`public/videos/`](public/videos/), then write
`file: /videos/your-file.mp4`.

### Capabilities

**Folder:** [`editorial/capabilities/`](editorial/capabilities/)  
**Shows on:** For partners (workshop / what we can build).

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Number |
| `label_de` / `label_en` | Yes | Short label (`Standort`, `Mechanik`, …) |
| `value_de` / `value_en` | Yes | One or two sentences |

---

## 13. Project pages

**Folder:** [`editorial/projects/`](editorial/projects/)  
Each project is a **folder**. Example for the wheelchair:

```
editorial/projects/wheelchair/
  index.md              ← name, tagline, cover, which videos
  sections/star-wheel.md
  sections/eye-level.md
  gallery/01.md         ← optional extra photos
```

**Shows on:** Projects index, project page, header dropdown, and (if
`featured: true`) landing-page previews.

### Add a project

1. Create a new folder `editorial/projects/your-slug/` (same naming rules).
2. Add `index.md` — copy [`_template/index.md`](editorial/projects/_template/index.md).
3. Add at least one file in `sections/` — copy
   [`_template/sections/_template.md`](editorial/projects/_template/sections/_template.md)
   and rename it (`star-wheel.md`, `idea.md`, …).
4. Optional: add `gallery/01.md`, `gallery/02.md`, …
5. Optional: list video ids in `videos:` (those files must exist under
   `editorial/videos/`).

### Fields in `index.md`

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Number. Smaller = earlier in the header and project list. |
| `pillar` | Yes | `hardware` · `software` · `awareness` |
| `featured` | No | `true` to show on landing-page previews. Delete the line to hide it there. |
| `name_de` / `name_en` | Yes | Project name |
| `tagline_de` / `tagline_en` | Yes | One-line hook (also in the header menu) |
| `summary_de` / `summary_en` | Yes | Card text |
| `status_de` / `status_en` | Yes | e.g. `Prototyp 2 im Test` |
| `cover` | Yes | `/images/…` |
| `cover_alt_de` / `cover_alt_en` | Yes | Cover description |
| `contribution_de` / `contribution_en` | Yes | What a new member can pick up |
| `videos` | No | Comma-separated ids, e.g. `stair-climb, tilted-path` |

### Section files (`sections/*.md`)

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Number on that project page |
| `title_de` / `title_en` | Yes | Heading |
| `body_de` / `body_en` | Yes | Paragraph |
| `image` | No | `/images/…` |
| `image_alt_de` / `image_alt_en` | Only if `image` is set | Description |

### Gallery files (`gallery/*.md`)

| Field | Required | What to write |
|---|---|---|
| `order` | Yes | Number |
| `src` | Yes | `/images/…` |
| `alt_de` / `alt_en` | Yes | Description |

To **delete a project**, delete the whole folder.

---

## 14. After you commit

1. GitHub → **Actions** or the Vercel dashboard: wait until the deploy is green.
2. Open [autak.org](https://autak.org) (or the preview URL on a pull request).
3. Hard-refresh. If you still see old text, try a private/incognito window.

If the deploy is **red**, your Markdown almost always has:

- a missing required field, or
- a wrong `category` / `kind` / `availability` / `group` / `pillar` value, or
- a video id in `videos:` that has no matching file in `editorial/videos/`, or
- a broken `---` block (deleted a dash, or a field without a space after `:`).

Fix the file and commit again. You do not need a developer for that.

---

## 15. Quick recipes

**“We were at an event yesterday.”**  
→ New file in `editorial/news/` · `category: event` · today’s `date` · upload a photo.

**“This internship is filled.”**  
→ Delete `editorial/positions/that-file.md`, or leave it and ask a developer if
you would rather show a “filled” state (that state does not exist yet).

**“Connie is in stock.”**  
→ Edit `editorial/shop/connie.md` · set `availability: available` · add `price` if needed.

**“Someone joined the team.”**  
→ Copy [`editorial/members/_template.md`](editorial/members/_template.md) → new
file `first-last.md` → `group: team` → upload `public/images/people/first-last.jpg`
(section 10).

**“Add an alumnus / former member.”**  
→ Same as above, but `group: alumni`. Or open their existing team file and
change `group` to `alumni`.

**“Add a supporter / mentor.”**  
→ Same new file, `group: supporters`. Optional `role_de` / `role_en`
(e.g. `Mentorin` / `Mentor`).

**“Someone left — they should be alumni.”**  
→ Edit their `.md` · set `group: alumni` · adjust `order`. Do not create a second file.

**“Typo in a headline.”**  
→ Open the `.md` · fix `title_de` or `title_en` · commit.

**“Wrong photo.”**  
→ Upload the new image · change the `image:` / `photo:` / `cover:` line.

**“New clip on the wheelchair page.”**  
→ Add `editorial/videos/short-id.md` · then add `short-id` to
`editorial/projects/wheelchair/index.md` on the `videos:` line.

**“Need this in French too.”**  
→ You only maintain German and English. Other languages are generated from
English by a developer (`npm run translate`).

---

## 16. Deutsch — Kurzüberblick

Du brauchst **kein Programmieren**. Inhalte liegen als `.md`-Dateien in
`editorial/`.

1. Auf GitHub die Datei öffnen → Stift → ändern → **Commit changes**.
2. Neu: `_template.md` kopieren → **Add file → Create new file** → `mein-titel.md`.
3. Löschen: Datei öffnen → Papierkorb → committen. Projekte: ganzen Ordner löschen.
4. Bilder nach `public/images/media/` (oder `people/` fürs Team) hochladen, dann  
   `image: /images/media/dateiname.jpg` (ohne `public`).
5. Immer `_de` **und** `_en` ausfüllen.
6. 2–5 Minuten warten, Seite hart neu laden.

Dateinamen: nur `a-z`, `0-9` und `-`. Keine Umlaute, keine Leerzeichen.

| Was | Ordner |
|---|---|
| News | `editorial/news/` |
| Praktika / Abschlussarbeiten | `editorial/positions/` |
| Shop | `editorial/shop/` |
| Team / Alumni / Unterstützer | `editorial/members/` |
| Projekte | `editorial/projects/projektname/` |
| Zitate | `editorial/voices/` |
| Presse | `editorial/press/` |
| Videos | `editorial/videos/` |
| Werkstatt / Fähigkeiten | `editorial/capabilities/` |

Wenn der Deploy fehlschlägt: Pflichtfeld fehlt, oder `category` / `kind` /
`availability` / `group` / `pillar` ist falsch geschrieben. Datei korrigieren
und erneut committen.

**Team / Alumni / Unterstützer hinzufügen:**  
`editorial/members/_template.md` kopieren → neue Datei `vorname-nachname.md` →
`group: team` oder `alumni` oder `supporters` → Foto nach
`public/images/people/vorname-nachname.jpg`. Jemand wechselt vom Team zu Alumni:
in der bestehenden Datei nur `group: alumni` setzen.

Rechtstexte und Navigation bitte an eine Entwicklerin / einen Entwickler geben.
Zitate nur mit Zustimmung der Person veröffentlichen.
