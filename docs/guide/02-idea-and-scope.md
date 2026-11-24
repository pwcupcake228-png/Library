# Step 2. Idea and scope

**Goal:** a unique app idea, a small finishable MVP, and the **next feature** you will add after it.

Decide the next feature now, while you only talk about the product. If it appears only after the MVP is built, it may need a rewrite of the architecture.

You do not need the coding agent for this step. Use any AI chat you like: [Claude](https://claude.ai), [ChatGPT](https://chatgpt.com), [Gemini](https://gemini.google.com).

## 2.1 What makes a good idea

- **It is yours.** It comes from your hobby, job, studies or a problem you actually have.
- **It is not a generic tutorial app.** No plain todo list, notes, weather or habit tracker — there are thousands of those in portfolios.
- **It has one or two main entities** (things you store), for example "plant" and "watering".
- **It has one thing beyond create/read/update/delete:** statistics, search, a calculation, a reminder, an import, a chart.
- **It is small:** an MVP you can build in a few evenings.
- **It is free to run:** no payments, no paid APIs.

## 2.2 Find ideas

Paste this into an AI chat and fill in the brackets:

```text
Help me pick an idea for a small full-stack web app for my portfolio.

About me: [your interests, hobbies, job, things you do every week, problems that annoy you]

Constraints:
- React frontend + Node.js/Express backend, built in a few evenings.
- 1–2 main entities, plus one feature beyond simple CRUD (stats, search, calculation, chart...).
- No payments, no paid APIs, no complex login.
- Not a generic todo, notes, weather or habit tracker app.

Suggest 7 ideas. For each: name, one-sentence problem it solves, who uses it,
the main entities, and the "beyond CRUD" feature.
```

**Expected behavior:** a list of concrete ideas tied to your interests. If they feel generic, tell the chat more about yourself and ask again. Pick the one *you* would actually use.

## 2.3 Define the MVP scope

In the same chat:

```text
I pick: [idea name].

Define a realistic MVP for it:
1. Product overview: name, problem, target user (2–3 sentences).
2. 3–6 user stories in the format "As a ..., I want ... so that ...".
3. In scope: what the MVP includes.
4. Out of scope: what we explicitly do NOT build now (accounts, payments, mobile app, ...).
5. One "next feature" to add after the MVP: user stories, rough acceptance criteria,
   and which parts of the app it touches (data, API, UI, roles).

Keep the MVP as small as possible while still useful from start to finish.
Write it in English, in Markdown.
```

**Expected behavior:** a short Markdown brief. Push back if it is too big: "Cut it to 4 stories" is a perfectly good reply.

## 2.4 Glossary

Name the words of your domain now, while they are fresh. Free models are weak: if two words sound alike (for example *product* and *order item*), they **will** mix them up in code and UI. A glossary in a separate file prevents that — every agent reads it before every task.

In the same chat:

```text
Make a glossary for this app as a Markdown table with columns:
Term | Meaning in this app | Not to be confused with | In code (table / type name).
Include every main entity, every role, and every pair of words that sound alike
but mean different things. Keep each meaning to one sentence.
```

**Expected behavior:** a table of 8–15 terms. Check the "Not to be confused with" column: if it is mostly empty, ask "which of these terms could a developer mix up?".

Save it in `docs/glossary.md` (replace the guidance in that file).

## 2.5 Sample data

An empty app is impossible to click through, demo or test, and a UI designed on empty data breaks on real data (long names, many relations). Sample data is also the best test of your idea: if you cannot write down 10–20 realistic records, the data is not thought through yet.

You do not need a database structure now. You need the data itself, in a simple JSON file. In the same chat:

```text
Now give me realistic sample data for this app as one JSON file.
- Write it the way a person would describe it: nested objects, relations by name,
  no ids and no database tables.
- 10–30 records in total.
- Include tricky cases on purpose: one item linked to several others, empty optional
  fields, a very long name.
- Only made-up or public data. No real personal data.
```

**Expected behavior:** a readable JSON file. Check that every user story can be shown with it. If something is hard to express, fix the brief first.

Use the words from your glossary in it. Save it as `data/seed.json` in the repository. In Step 3 you decide how it gets into the app.

## 2.6 Save the brief

1. Open `docs/requirements.md`.
2. Paste the MVP brief into sections 1–4 (Product overview, Users, User stories, Scope).
3. Change the status line at the top to `Status: draft`.
4. Create `docs/features/<feature-name>.md` and paste the next feature there. Add one line on top: `Status: planned — do not implement as part of the MVP`.
5. In "Out of scope" of `docs/requirements.md`, mention the feature with a link to its file.
6. Commit:

```bash
git add docs/requirements.md docs/features docs/glossary.md data
git commit -m "Add project brief, glossary, next feature and sample data"
```

If your course keeps a shared list of ideas, add yours there, so everyone builds something different.

## ✅ Result

- [ ] `docs/requirements.md` contains your app name, problem, users, 3–6 user stories, in scope / out of scope.
- [ ] `docs/features/<feature-name>.md` describes the next feature: stories, rough criteria, what it touches.
- [ ] `docs/glossary.md` lists the domain terms, including words that are easy to mix up.
- [ ] `data/seed.json` contains realistic sample data, including tricky cases.
- [ ] The brief is committed.

Next: [Step 3. Data, key decisions and hosting](03-data-and-hosting.md) — from there on you work in OpenCode.
